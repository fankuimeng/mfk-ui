<template>
  <textarea class="editor" :value="value" @change="handleCodeValue" />
  <div className="preview">
    <sand-box bundlerURL="http://127.0.0.1:8888" :codeValue="value" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import sourceFiles from './sourceCode.js';
import SandBox from './sandbox.vue';

const value = ref(sourceFiles['/src/App.vue']);
const handleCodeValue = (e) => (value.value = e.target.value);
</script>

<style scoped>
.editor {
  width: 100%;
  height: 400px;
}
.preview {
  width: 100%;
  height: 400px;
}
</style>
