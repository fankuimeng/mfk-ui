<template>
  <div class="slide">
    <ol v-for="(nav, index) in navs" :key="index">
      <li>{{ true ? nav.name : nav.enName }}</li>
      <ul>
        <template
          v-for="_package in reorder(nav.packages)"
          :class="_package.name === activeName ? 'active' : ''"
          :key="_package"
        >
          <li>
            <a
              @click="handleRouter(_package.name)"
              :class="_package.name === activeName ? 'active' : ''"
            >
              {{ _package.name }}&nbsp;&nbsp;
              <b v-if="true">{{ _package.cName }}</b>
            </a>
          </li>
        </template>
      </ul>
    </ol>
  </div>
</template>

<script setup lang="ts">
import { navs } from './index.json';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const component = ref(false);

const activeName = ref('Button');

const router = useRouter();
const hanlecomponent = () => {
  component.value = !component.value;
};

const reorder = (packages: any) => {
  return packages.sort(function (x: any, y: any) {
    return x['name'].localeCompare(y['name']);
  });
};

const handleRouter = (name: string) => {
  const local = 'zh-CN';
  const path = name.toLowerCase();
  activeName.value = name;
  router.push(`/component/${path}-${local}`);
};

const switchLang = () => {
  console.log('中英文切换');
};
</script>
