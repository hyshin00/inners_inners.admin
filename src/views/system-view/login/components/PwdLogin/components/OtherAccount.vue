<template>
  <n-space :vertical="true">
    <n-divider class="!mb-0 text-14px text-[#666]">다른 계정 로그인</n-divider>
    <n-space justify="center">
      <n-button
        v-for="item in accounts"
        :key="item.userName"
        type="primary"
        @click="login(item.userName, item.password)"
      >
        {{ item.label }}
      </n-button>
    </n-space>
  </n-space>
</template>

<script lang="ts" setup>
interface Emits {
  (e: 'login', param: { userName: string; password: string }): void;
}

const emit = defineEmits<Emits>();

const accounts = [
  {
    label: '슈퍼 관리자',
    userName: 'Super',
    password: 'super123'
  },
  {
    label: '관리자',
    userName: 'Admin',
    password: 'admin123'
  },
  {
    label: '일반 사용자',
    userName: 'User01',
    password: 'user01123'
  }
];

function login(userName: string, password: string) {
  emit('login', { userName, password });
}
</script>

<style scoped></style>
