<template>
  <n-dropdown :options="options" @select="handleDropdown">
    <hover-container class="px-12px" :inverted="theme.header.inverted">
      <icon-local-avatar class="text-32px" />
      <span class="font-medium pl-8px text-16px">{{ auth.userInfo.userName }}</span>
    </hover-container>
  </n-dropdown>
</template>

<script lang="ts" setup>
import type { DropdownOption } from 'naive-ui';
import { useAuthStore, useThemeStore } from '@/store';
import { useIconRender } from '@/composables';

defineOptions({ name: 'UserAvatar' });

const auth = useAuthStore();
const theme = useThemeStore();
const { iconRender } = useIconRender();

const options: DropdownOption[] = [
  {
    label: '사용자센터',
    key: 'user-center',
    icon: iconRender({ icon: 'carbon:user-avatar' })
  },
  {
    type: 'divider',
    key: 'divider'
  },
  {
    label: '로그아웃',
    key: 'logout',
    icon: iconRender({ icon: 'carbon:logout' })
  }
];

type DropdownKey = 'user-center' | 'logout';

function handleDropdown(optionKey: string) {
  const key = optionKey as DropdownKey;
  if (key === 'logout') {
    window.$dialog?.info({
      title: '힌트',
      content: '로그아웃 하시겠습니까?',
      positiveText: '확인',
      negativeText: '취소',
      onPositiveClick: () => {
        auth.resetAuthStore();
      }
    });
  }
}
</script>

<style scoped></style>
