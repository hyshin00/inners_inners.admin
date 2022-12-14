<template>
  <n-divider title-placement="center">인터페이스 함수</n-divider>
  <n-space vertical size="large">
    <setting-menu label="사이드 바 반전 색상">
      <n-switch :value="theme.sider.inverted" @update:value="theme.setSiderInverted" />
    </setting-menu>
    <setting-menu label="헤드 역전 색상">
      <n-switch :value="theme.header.inverted" @update:value="theme.setHeaderInverted" />
    </setting-menu>
    <setting-menu label="고정 헤드 및 멀티 탭">
      <n-switch :value="theme.fixedHeaderAndTab" @update:value="theme.setIsFixedHeaderAndTab" />
    </setting-menu>
    <setting-menu label="최상위 메뉴 위치">
      <n-select
        class="w-120px"
        size="small"
        :value="theme.menu.horizontalPosition"
        :options="theme.menu.horizontalPositionList"
        @update:value="theme.setHorizontalMenuPosition"
      />
    </setting-menu>
    <setting-menu label="헤더 높이">
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.header.height"
        :step="1"
        @update:value="theme.setHeaderHeight"
      />
    </setting-menu>
    <setting-menu label="멀티 페이지 높이">
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.tab.height"
        :step="1"
        @update:value="theme.setTabHeight"
      />
    </setting-menu>
    <setting-menu label="멀티 페이지 캐시">
      <n-switch :value="theme.tab.isCache" @update:value="theme.setTabIsCache" />
    </setting-menu>
    <setting-menu label="사이드 바의 너비">
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.sider.width"
        :step="10"
        @update:value="theme.setSiderWidth"
      />
    </setting-menu>
    <setting-menu label="사이드 바의 너비(하이브리드)">
      <n-input-number
        class="w-120px"
        size="small"
        :value="theme.sider.mixWidth"
        :step="5"
        @update:value="theme.setMixSiderWidth"
      />
    </setting-menu>
    <setting-menu label="바닥 고정">
      <n-switch :value="theme.footer.fixed" @update:value="theme.setFooterIsFixed" />
    </setting-menu>
  </n-space>
</template>

<script lang="ts" setup>
import { useThemeStore } from '@/store';
import SettingMenu from '../SettingMenu/index.vue';

defineOptions({ name: 'PageFunc' });

const theme = useThemeStore();
</script>

<style scoped></style>
