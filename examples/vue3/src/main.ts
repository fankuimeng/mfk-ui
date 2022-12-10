import { createApp } from 'vue';
import App from './app.vue';
import router from './router';
import microApp from '@micro-zoe/micro-app';

import '@/assets/styles/reset.less';
import '@/assets/styles/md-style.less';
import 'virtual:windi.css';

const app = createApp(App);
microApp.start();

app.use(router).mount('#app');
