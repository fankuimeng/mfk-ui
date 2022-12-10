import markdown from 'markdown-it';
import hljs from 'highlight.js';
import fs from 'fs';
import path from 'path';

function kebabCase(key) {
  const ret = key?.replace(/([A-Z])/g, ' $1').trim();
  return ret.split(' ').join('-').toLowerCase();
}

function htmlWrapper(html) {
  const hGroup = html?.replace(/<h3/g, ':::<h3').replace(/<h2/g, ':::<h2').split(':::');
  const cardGroup = hGroup
    .map((fragment) => (fragment.includes('<h3') ? `<div>${fragment}</div>` : fragment))
    .join('');
  return cardGroup?.replace(/<code>/g, '<code v-pre>');
}

function extractComponents(source) {
  const componentRE = /import (.+) from ['"].+['"]/;
  const importRE = /import .+ from ['"].+['"]/g;
  const vueRE = /```vue((.|\r|\n)*?)```/g;
  const imports = [];
  const components = [];

  source = source?.replace(vueRE, (_, p1) => {
    const partImports = p1.match(importRE);

    const partComponents = partImports?.map((importer) => {
      importer = importer.replace(/(\n|\r)/g, '');
      const component = importer.replace(componentRE, '$1');
      !imports.includes(importer) && imports.push(importer);
      !components.includes(component) && components.push(component);
      return `<${kebabCase(component)} />`;
    });

    return partComponents
      ? `<div class="component-preview">${partComponents.join('\n')}</div>`
      : '';
  });

  return {
    imports,
    components,
    source,
  };
}

function injectCodeExample(source) {
  const codeRE = /(<pre class="hljs">(.|\r|\n)*?<\/pre>)/g;
  return source.replace(codeRE, (str) => {
    const flags = [
      '// playground-ignore\n',
      '<span class="hljs-meta">#</span><span class="bash"> playground-ignore</span>\n',
      '<span class="hljs-comment">// playground-ignore</span>\n',
      '<span class="hljs-comment">/* playground-ignore */</span>\n',
      '<span class="hljs-comment">&lt;!-- playground-ignore --&gt;</span>\n',
    ];

    const attr = flags.some((flag) => str.includes(flag)) ? 'playground-ignore' : '';

    str = flags.reduce((str, flag) => str.replace(flag, ''), str);

    return `<var-site-code-example ${attr}>${str}</var-site-code-example>`;
  });
}

function highlight(str, lang, style) {
  let link = '';

  if (style) {
    link = '<link class="hljs-style" rel="stylesheet" href="' + style + '"/>';
  }

  if (lang && hljs.getLanguage(lang)) {
    return (
      '<pre class="hljs"><code>' +
      link +
      hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
      '</code></pre>'
    );
  }

  return '';
}

function markdownToVue(source, options) {
  const { source: vueSource, imports, components } = extractComponents(source);
  const md = markdown({
    html: true,
    typographer: true,
    highlight: (str, lang) => highlight(str, lang, options?.style),
  });

  let templateString = htmlWrapper(md.render(vueSource));

  templateString = templateString.replace(/process.env/g, '<span>process.env</span>');
  templateString = injectCodeExample(templateString);

  const result = handleCodeLink(templateString);
  return `
<template><div class='doc-content-document'>${result.templateString}</div></template>
<script>
${result.scriptStr}
${imports.join('\n')}
export default {
  components: {
    ${result.component}
    ${components.join(',')}
  }
}
</script>
  `;
}

export default function markdownVitePlugin(options) {
  return {
    name: 'markdown-vite-plugin',
    enforce: 'pre',
    transform(source, id) {
      if (!/\.md$/.test(id)) {
        return;
      }

      try {
        return markdownToVue(source, options);
      } catch (e) {
        this.error(e);
        return '';
      }
    },
    async handleHotUpdate(ctx) {
      if (!/\.md$/.test(ctx.file)) return;

      const readSource = ctx.read;
      ctx.read = async function () {
        return markdownToVue(await readSource(), options);
      };
    },
  };
}

const handleCodeLink = (templateString) => {
  const codeSrcRE = /<code (([\s\S])*?)<\/code>/g;
  const srcsArr = templateString.match(codeSrcRE)?.filter((item) => item.includes('src'));
  let scriptStr = '';
  let component = '';
  srcsArr?.forEach((str) => {
    const src = str?.split('/demo/')[1]?.split('.vue')[0];
    const pathName = str?.split('/')[1];
    const content = str.split('</')[0];
    const noLine = toHump(src);
    const name = noLine?.replace(/(\w)/, function (all, letter) {
      return letter.toUpperCase();
    });
    // console.log(
    //   path.join(__dirname, `../../../packages/components/src/${pathName}/demo/${noLine}.vue`),

    //   fs.readFileSync(
    //     path.join(__dirname, `../../../packages/components/src/${pathName}/demo/${noLine}.vue`),
    //     'utf-8',
    //   ),
    // );
    templateString = templateString.replace(content, `${content}<${src} />`);
    component += `${name},\n`;
    scriptStr += `import ${name} from './demo/${noLine}.vue';\n`;
  });

  return {
    templateString,
    scriptStr,
    component,
  };
};

//横线转驼峰
function toHump(name) {
  return name?.replace(/\-(\w)/g, function (all, letter) {
    return letter.toUpperCase();
  });
}
