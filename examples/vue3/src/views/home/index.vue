<template>
  <div class="layout">
    <doc-header></doc-header>
    <doc-nav></doc-nav>
    <div id="doc-content" class="doc-content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import DocHeader from '@/components/Header/index.vue';
import DocNav from '@/components/Nav/index.vue';
const router = useRouter();
console.log(router);
</script>

<style lang="less" scoped src="./index.less"></style>
