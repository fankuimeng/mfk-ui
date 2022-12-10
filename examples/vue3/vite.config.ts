import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import WindiCSS from 'vite-plugin-windicss';
import markdownVitePlugin from './plugin/index';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    vue({
      include: [/\.vue$/, /\.md$/],
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('mfk-'),
        },
      },
    }),
    vueJsx(),
    markdownVitePlugin({
      style: 'a11y-dark',
    }), // 使用md文件转换插件，使用插件时可以传入参数
    WindiCSS(),
  ],
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './src') }],
  },
  server: {
    port: 4000,
  },
});
