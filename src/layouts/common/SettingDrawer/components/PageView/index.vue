<template>
  <n-divider title-placement="center">인터페이스 디스플레이</n-divider>
  <n-space vertical size="large">
    <setting-menu label="빵 부스러기">
      <n-switch :value="theme.header.crumb.visible" @update:value="theme.setHeaderCrumbVisible" />
    </setting-menu>
    <setting-menu label="빵 부스러기 아이콘">
      <n-switch :value="theme.header.crumb.showIcon" @update:value="theme.setHeaderCrumbIconVisible" />
    </setting-menu>
    <setting-menu label="멀티 페이지">
      <n-switch :value="theme.tab.visible" @update:value="theme.setTabVisible" />
    </setting-menu>
    <setting-menu label="탭 헤드 스타일">
      <n-select
        class="w-120px"
        size="small"
        :value="theme.tab.mode"
        :options="theme.tab.modeList"
        @update:value="theme.setTabMode"
      />
    </setting-menu>
    <setting-menu label="페이지 스위치 애니메이션">
      <n-switch :value="theme.page.animate" @update:value="theme.setPageIsAnimate" />
    </setting-menu>
    <setting-menu label="페이지 스위치 애니메이션 유형">
      <n-select
        class="w-120px"
        size="small"
        :value="theme.page.animateMode"
        :options="theme.page.animateModeList"
        @update:value="theme.setPageAnimateMode"
      />
    </setting-menu>
  </n-space>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store';
import SettingMenu from '../SettingMenu/index.vue';

defineOptions({ name: 'PageView' });

const theme = useThemeStore();
</script>

<style scoped></style>
