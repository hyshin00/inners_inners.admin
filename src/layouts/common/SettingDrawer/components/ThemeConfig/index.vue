<template>
  <n-divider title-placement="center">테마 구성</n-divider>
  <textarea id="themeConfigCopyTarget" v-model="dataClipboardText" class="absolute opacity-0" />
  <n-space vertical>
    <div ref="copyRef" data-clipboard-target="#themeConfigCopyTarget">
      <n-button type="primary" :block="true">현재 구성을 복사하십시오</n-button>
    </div>
    <n-button type="warning" :block="true" @click="handleResetConfig">현재 구성을 재설정하십시오</n-button>
  </n-space>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import Clipboard from 'clipboard';
import { useThemeStore } from '@/store';

defineOptions({ name: 'ThemeConfig' });

const theme = useThemeStore();

const copyRef = ref<HTMLElement>();

const dataClipboardText = ref(getClipboardText());

function getClipboardText() {
  return JSON.stringify(theme.$state);
}

function handleResetConfig() {
  theme.resetThemeStore();
  window.$message?.success('구성이 재설정되었습니다. 다시 복사하십시오!');
}

function clipboardEventListener() {
  if (!copyRef.value) return;
  const copy = new Clipboard(copyRef.value);
  copy.on('success', () => {
    window.$dialog?.success({
      title: '성공적인 운영',
      content: '성공적으로 복사하십시오. 교체하십시오 src/settings/theme.json 콘텐츠！',
      positiveText: '확인'
    });
  });
}

const stopHandle = watch(
  () => theme.$state,
  () => {
    dataClipboardText.value = getClipboardText();
  },
  { deep: true }
);

onMounted(() => {
  clipboardEventListener();
});
onUnmounted(() => {
  stopHandle();
});
</script>

<style scoped></style>
