// const sh = require("shelljs");
// const argv = require("minimist")(process.argv.slice(2));

// const devTarget = argv._[0] || "vue3";
// sh.cd(`./example/${devTarget}`).exec("yarn && yarn run dev");
const rollup = require("rollup");
const resolve = require("rollup-plugin-node-resolve");
const ts = require("rollup-plugin-typescript2");

// 开发环境打包一个库文件
const argv = require("minimist")(process.argv.slice(2));
const { join } = require("path");
const { readdirSync } = require("fs");

const target = argv._[0];
const format = argv.f || "es";

const extensions = [".js", ".ts", ".tsx"];

// ts
const tsPlugin = ts({
  tsconfig: join(__dirname, "../tsconfig.json"), // 导入本地ts配置
  extensions,
});

const result = target ? [target] : readdirSync(join(__dirname, "../packages"));

// iife 立即执行函数

async function build(inputOptions, outputOptions) {
  const bundle = await rollup.rollup(inputOptions);
  const { output } = await bundle.generate(outputOptions);
  for (const chunkOrAsset of output) {
    if (chunkOrAsset.type === "asset") {
      // 对于assets，包含
      // {
      //   fileName: string,              // asset 文件名
      //   source: string | Uint8Array    // asset 资源
      //   type: 'asset'                  // 表示这是一个 asset
      // }
      console.log("Asset", chunkOrAsset);
    } else {
      // 对于chunks, 包含
      // {
      //   code: string,                  // 生成的JS代码
      //   dynamicImports: string[],      // chunk 动态导入的外部模块
      //   exports: string[],             // 导出的变量名
      //   facadeModuleId: string | null, // 该chunk对应的模块的ID
      //   fileName: string,              // chunk的文件名
      //   imports: string[],             // chunk 静态导入的外部模块
      //   isDynamicEntry: boolean,       // 该 chunk 是否是动态入口点
      //   isEntry: boolean,              // 该 chunk 是否是静态入口点
      //   map: string | null,            // sourcemaps(如果存在)
      //   modules: {                     // 此 chunk 中模块的信息
      //     [id: string]: {
      //       renderedExports: string[]; // 导出的已包含变量名
      //       removedExports: string[];  // 导出的已删除变量名
      //       renderedLength: number;    // 模块中剩余代码的长度
      //       originalLength: number;    // 模块中代码的原始长度
      //     };
      //   },
      //   name: string                   // 命名模式中使用的 chunk 的名称
      //   type: 'chunk',                 // 表示这是一个chunk
      // }
      console.log("Chunk", chunkOrAsset.modules);
    }
  }
  // 或者将bundle写入磁盘
  await bundle.write(outputOptions);
}

// 打包所有文件
(function buildAll() {
  console.log(format);
  result.forEach((item) => {
    const inputOptions = {
      input: join(__dirname, `../packages/${item}/src/index.ts`),
      plugins: [resolve(extensions), tsPlugin],
    };
    const outputOptions = {
      name: item,
      format: format,
      file: join(__dirname, `../packages/${item}/dist/${item}.js`),
    };
    build(inputOptions, outputOptions);
  });
})();
