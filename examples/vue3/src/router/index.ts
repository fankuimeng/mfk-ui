import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Layout from '@/layouts/index.vue';

import Home from '@/views/home/index.vue';
import Component from '@/views/component/index.vue';
import MyPage from '@/views/MyPage/index.vue';

const pagesRouter: Array<RouteRecordRaw> = [];

const modulesPage = import.meta.glob(`../../../../packages/components/**/*.md`);

for (const path in modulesPage) {
  if (path.includes('react')) continue;
  const nameArr = /src\/(.*)\/doc.*.md/.exec(path) as any[];
  const name = nameArr[1].toLowerCase();
  const local = nameArr[0]?.split('.')[1];
  pagesRouter.push({
    path: `/components/${name}-${local}`,
    component: modulesPage[path],
  });
}

const routes: Array<RouteRecordRaw> = [
  { path: '/:lang(.*)', redirect: '/components/button-zh-CN' },
  {
    path: '/components',
    component: Layout,
    children: [
      {
        path: 'overview:lang(.*)',
        component: () => import('../views/ComponentOverview/index.vue'),
      },
      ...pagesRouter,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
