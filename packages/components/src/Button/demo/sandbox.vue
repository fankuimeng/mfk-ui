<template>
  <iframe
    v-if="isre"
    :ref="iframeEl"
    title="sandbox-container"
    :class="codeValue"
    id="sandbox-container"
    style="
       {
        width: '100%';
        height: '100%';
        border: 0;
        outline: 0;
        'background-color':'#f10'
      }
    "
  />
</template>

<script setup>
import { defineProps } from 'vue';
import { ref, onMounted, watch } from 'vue';
import sourceFiles from './sourceCode.js';

const props = defineProps(['bundlerURL', 'codeValue']);
const iframeEl = ref('iframeEl');
const isre = ref(true);
let nweFiles = sourceFiles;

onMounted(() => {
  iframeEl.value.onload = () => sendProjectInfo(sourceFiles);
  iframeEl.value.src = props.bundlerURL;
  sendProjectInfo(nweFiles);
});

watch(
  () => props.codeValue,
  (newValue) => {
    nweFiles = { ...nweFiles, '/src/App.vue': newValue };
    sendProjectInfo();
  },
);
const sendProjectInfo = () => {
  const el = iframeEl.value;
  el.contentWindow.postMessage(
    {
      type: 'compile-esm',
      payload: {
        files: nweFiles,
        busid: 'basic',
        wcid: 'basic',
      },
    },
    '*',
  );
};
</script>

<style>
#sandbox-container {
  width: 100%;
  height: 100%;
}
</style>
