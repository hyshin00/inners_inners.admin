<template>
  <div class="wh-full flex-col-center">
    <n-gradient-text class="mb-24px" type="primary" :size="28">Custom Constant Page</n-gradient-text>
    <router-link :to="{ name: routeHomePath }">
      <n-button type="primary">첫페이지로</n-button>
    </router-link>
    <n-card :bordered="false" size="small" class="mt-24px rounded-16px shadow-sm">
      <div class="flex-center py-12px">
        <n-button type="primary" class="mr-24px" :disabled="isMoving" @click="startMove">开始</n-button>
        <n-button type="error" @click="endMove">暂停</n-button>
      </div>
      <div class="flex-center">
        <div class="relative bg-primary_active" :style="containerStyle">
          <svg class="w-full h-full">
            <ellipse
              :cx="ellipseConfig.cX"
              :cy="ellipseConfig.cY"
              :rx="ellipseConfig.rX"
              :ry="ellipseConfig.rY"
              :style="{ strokeWidth: ellipseConfig.strokeWidth + 'px' }"
              class="fill-none stroke-primary"
            ></ellipse>
          </svg>
          <div class="absolute left-182px top-82px w-40px h-40px bg-red rounded-20px" :style="transformStyle"></div>
        </div>
      </div>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { routeName } from '@/router';

const routeHomePath = routeName('root');

interface EllipseConfig {
  /** X는 왼쪽 상단 코너에서 좌표를합니다 */
  cX: number;
  /** y 왼쪽 상단 코너에서 좌표 */
  cY: number;
  /** 타원 긴 반 축 a */
  rX: number;
  /** 타원형 짧은 반 축 b */
  rY: number;
  /** 타원형 라인 너비 */
  strokeWidth: number;
}

const ellipseConfig: EllipseConfig = {
  cX: 202,
  cY: 102,
  rX: 200,
  rY: 100,
  strokeWidth: 2
};

const containerStyle = (() => {
  const { rX, rY, strokeWidth } = ellipseConfig;

  const width = (rX + strokeWidth) * 2;
  const height = (rY + strokeWidth) * 2;

  return `width:${width}px;height:${height}px;`;
})();

/** 각도 */
const angle = ref(0);

const transformStyle = computed(() => {
  const { rX, rY } = ellipseConfig;
  const x = rX * Math.sin(angle.value);
  const y = rY * Math.cos(angle.value);

  return `transform: translate3d(${x}px,${y}px,0px)`;
});

/** 운동 속도(주/초) */
const speed = ref(2);

/** 일주일의 각도(호) */
const FULL_ANGLE = 2 * Math.PI;

/** requestAnimationFrame一실행 수 */
const TIMES_PER_SECONDS = 60;

const updateAnglePerTime = computed(() => FULL_ANGLE / speed.value / TIMES_PER_SECONDS);

const rafId = ref<number | null>(null);

const isMoving = computed(() => rafId.value !== null);

const startMove = () => {
  angle.value += updateAnglePerTime.value;

  rafId.value = window.requestAnimationFrame(startMove);
};

const endMove = () => {
  if (rafId.value !== null) {
    window.cancelAnimationFrame(rafId.value);
    rafId.value = null;
  }
};
</script>

<style scoped></style>
