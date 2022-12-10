<template>
  <div class="layout">
    <layout-header></layout-header>
    <layout-slide></layout-slide>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
import LayoutHeader from './componment/LayoutHeader/index.vue';
import LayoutSlide from './componment/LayoutSlide/index.vue';
</script>

<style src="./index.less" lang="less"></style>
