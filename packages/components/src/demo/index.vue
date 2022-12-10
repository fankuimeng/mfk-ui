<template>
  <div class="demo">
    <h4>{{ title }}</h4>
    <p>{{ desc }}</p>
  </div>
  <div class="demo-icon">
    <ul>
      <span>box</span>
      <span>vue</span>
      <span>复制</span>
      <span>展开</span>
    </ul>
    <textarea :rows="10" class="code-edit" />
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
const { title, desc } = defineProps(['title', 'desc']);
</script>

<style lang="less">
.demo {
  width: 100%;
  margin: 8px 0;
  border-top: 1px solid rgb(238, 229, 229);
  border-bottom: 1px solid rgb(238, 229, 229);
  h1 {
    font-weight: 400;
    font-size: 14px;
  }
  p {
    font-size: 12px;
  }
}
.demo-icon {
  margin: 10px;
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-direction: column;
  ul {
    display: flex;
    justify-content: center;
    span {
      list-style-type: none;
      margin: 0 10px;
    }
  }
}
.code-edit {
  max-height: 300px;
}
</style>
