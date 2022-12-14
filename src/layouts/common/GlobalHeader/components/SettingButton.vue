<template>
  <hover-container
    class="h-full w-40px"
    tooltip-content="테마 구성"
    :inverted="theme.header.inverted"
    @click="app.toggleSettingDrawerVisible"
  >
    <icon-ant-design-setting-outlined class="text-20px" />
  </hover-container>
</template>

<script setup lang="ts">
import { useAppStore, useThemeStore } from '@/store';

defineOptions({ name: 'SettingButton' });

const app = useAppStore();
const theme = useThemeStore();
</script>

<style scoped></style>
