<template>
  <div v-if="reloadFlag" class="relative">
    <slot></slot>
    <div v-show="showPlaceholder" class="absolute-lt w-full h-full" :class="placeholderClass">
      <div v-show="loading" class="absolute-center">
        <n-spin :show="true" :size="loadingSize" />
      </div>
      <div v-show="isEmpty" class="absolute-center">
        <div class="relative">
          <icon-local-empty-data :class="iconClass" />
          <p class="absolute-lb w-full text-center" :class="descClass">{{ emptyDesc }}</p>
        </div>
      </div>
      <div v-show="!network" class="absolute-center">
        <div class="relative" :class="{ 'cursor-pointer': showNetworkReload }" @click="handleReload">
          <icon-local-network-error :class="iconClass" />
          <p class="absolute-lb w-full text-center" :class="descClass">{{ networkErrorDesc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onUnmounted, watch } from 'vue';
import { NETWORK_ERROR_MSG } from '@/config';
import { useBoolean } from '@/hooks';

defineOptions({ name: 'LoadingEmptyWrapper' });

interface Props {
  /** 로드할지 여부 */
  loading: boolean;
  /** 비어 있든 */
  empty?: boolean;
  /** 아이콘의 크기를로드하십시오 */
  loadingSize?: 'small' | 'medium' | 'large';
  /** 중간 배치 기호class */
  placeholderClass?: string;
  /** 빈 데이터 설명 텍스트 */
  emptyDesc?: string;
  /** 상의class */
  iconClass?: string;
  /** 설명class */
  descClass?: string;
  /** 네트워크 이상의 클릭 버튼을 반복하십시오 */
  showNetworkReload?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  loading: false,
  empty: false,
  loadingSize: 'medium',
  placeholderClass: 'bg-white dark:bg-dark transition-background-color duration-300 ease-in-out',
  emptyDesc: '데이터가 없습니다',
  iconClass: 'text-320px text-primary',
  descClass: 'text-16px text-[#666]',
  showNetworkReload: false
});

// 네트워크 상태
const { bool: network, setBool: setNetwork } = useBoolean(window.navigator.onLine);
const { bool: reloadFlag, setBool: setReload } = useBoolean(true);

// 데이터가 비어 있는지 여부
const isEmpty = computed(() => props.empty && !props.loading && network.value);

const showPlaceholder = computed(() => props.loading || isEmpty.value || !network.value);

const networkErrorDesc = computed(() =>
  props.showNetworkReload ? `${NETWORK_ERROR_MSG}, 点击重试` : NETWORK_ERROR_MSG
);

function handleReload() {
  if (!props.showNetworkReload) return;
  setReload(false);
  nextTick(() => {
    setReload(true);
  });
}

const stopHandle = watch(
  () => props.loading,
  newValue => {
    // 로드를 종료하고 네트워크 상태를 판단합니다
    if (!newValue) {
      setNetwork(window.navigator.onLine);
    }
  }
);

onUnmounted(() => {
  stopHandle();
});
</script>

<style scoped></style>
