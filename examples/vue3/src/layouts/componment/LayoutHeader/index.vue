<template>
  <div class="header shadow-xl">
    <h1 class="logo">
      <router-link to="/components">
        <img src="../../../assets/images/logo.svg" alt="" />
        Ant Design Vue
      </router-link>
    </h1>
    <div class="header-right">
      <div class="search">
        <a-input></a-input>
      </div>
      <ul>
        <router-link class="link animate-pulse" :key="item" v-for="item in a" to="/component">
          <span>{{ item }}</span>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const a = ['文档', '组件', '中文', '主题'];
</script>
