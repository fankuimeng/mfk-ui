const packageJson = {
  name: 'demo',
  private: true,
  dependencies: {
    vue: '^3.2.45',
  },
};

const htmlCode = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="data:image/ico;base64,aWNv">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="root" />
    <script type="module" src="/src/index.js"></script>
  </body>
</html>`.trim();

const entryCode = `
import { createApp } from 'vue';
import App from './App.vue';
import './index.less';

const app = createApp(App);
app.mount('#root');

`.trim();

const lessCode = `
body {
  background: #eee;
}
`.trim();

const appCode = `
<template>
  <h1 @click="handleClick">{{count}}代价好{{a}}</h1>
</template>
<script lang="ts" setup>
import {ref} from 'vue';
const count = ref<number>(0)
const a:string = '23';
const handleClick = () => count.value = count.value +  1
</script>
`.trim();

const files = {
  '/package.json': JSON.stringify(packageJson),
  '/index.html': htmlCode,
  '/src/index.ts': entryCode,
  '/src/index.less': lessCode,
  '/src/App.vue': appCode,
};

export default files;
