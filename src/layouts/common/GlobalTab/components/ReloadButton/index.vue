<template>
  <hover-container class="h-full w-64px" tooltip-content="다시로드" placement="bottom-end" @click="handleRefresh">
    <icon-mdi-refresh class="text-22px" :class="{ 'animate-spin': loading }" />
  </hover-container>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store';
import { useLoading } from '@/hooks';

defineOptions({ name: 'ReloadButton' });

const app = useAppStore();
const { loading, startLoading, endLoading } = useLoading();

function handleRefresh() {
  startLoading();
  app.reloadPage();
  setTimeout(() => {
    endLoading();
  }, 1000);
}
</script>

<style scoped></style>
