<template>
  <n-modal v-model:show="modalVisible" preset="card" :title="title" class="w-700px">
    <n-form ref="formRef" label-placement="left" :label-width="80" :model="formModel" :rules="rules">
      <n-grid :cols="24" :x-gap="18">
        <n-form-item-grid-item :span="12" label="사용자 이름" path="userName">
          <n-input v-model:value="formModel.userName" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="나이" path="age">
          <n-input-number v-model:value="formModel.age" clearable />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="성별" path="gender">
          <n-radio-group v-model:value="formModel.gender">
            <n-radio v-for="item in genderOptions" :key="item.value" :value="item.value">{{ item.label }}</n-radio>
          </n-radio-group>
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="전화 번호" path="phone">
          <n-input v-model:value="formModel.phone" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="우편" path="email">
          <n-input v-model:value="formModel.email" />
        </n-form-item-grid-item>
        <n-form-item-grid-item :span="12" label="상태" path="userStatus">
          <n-select v-model:value="formModel.userStatus" :options="userStatusOptions" />
        </n-form-item-grid-item>
      </n-grid>
      <n-space class="w-full pt-16px" :size="24" justify="end">
        <n-button class="w-72px" @click="closeModal">취소</n-button>
        <n-button class="w-72px" type="primary" @click="handleSubmit">확인</n-button>
      </n-space>
    </n-form>
  </n-modal>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import type { FormInst, FormItemRule } from 'naive-ui';
import { formRules, createRequiredFormRule } from '@/utils';
import { genderOptions, userStatusOptions } from '@/constants';

export interface Props {
  /** 인기있는 가시성 */
  visible: boolean;
  /**
   * 팝 -UP
   * add: 새로 증가합니다
   * edit: 편집하다
   */
  type?: 'add' | 'edit';
  /** 테이블 필름 데이터 편집 */
  editData?: UserManagement.User | null;
}

export type ModalType = NonNullable<Props['type']>;

defineOptions({ name: 'TableActionModal' });

const props = withDefaults(defineProps<Props>(), {
  type: 'add',
  editData: null
});

interface Emits {
  (e: 'update:visible', visible: boolean): void;
}

const emit = defineEmits<Emits>();

const modalVisible = computed({
  get() {
    return props.visible;
  },
  set(visible) {
    emit('update:visible', visible);
  }
});
const closeModal = () => {
  modalVisible.value = false;
};

const title = computed(() => {
  const titles: Record<ModalType, string> = {
    add: '사용자 추가',
    edit: '사용자 편집'
  };
  return titles[props.type];
});

const formRef = ref<HTMLElement & FormInst>();

type FormModel = Pick<UserManagement.User, 'userName' | 'age' | 'gender' | 'phone' | 'email' | 'userStatus'>;

const formModel = reactive<FormModel>(createDefaultFormModel());

const rules: Record<keyof FormModel, FormItemRule | FormItemRule[]> = {
  userName: createRequiredFormRule('사용자 이름을 입력하십시오'),
  age: createRequiredFormRule('나이를 입력하십시오'),
  gender: createRequiredFormRule('성별을 선택하십시오'),
  phone: formRules.phone,
  email: formRules.email,
  userStatus: createRequiredFormRule('사용자 상태를 선택하십시오')
};

function createDefaultFormModel(): FormModel {
  return {
    userName: '',
    age: null,
    gender: null,
    phone: '',
    email: null,
    userStatus: null
  };
}

function handleUpdateFormModel(model: Partial<FormModel>) {
  Object.assign(formModel, model);
}

function handleUpdateFormModelByModalType() {
  const handlers: Record<ModalType, () => void> = {
    add: () => {
      const defaultFormModel = createDefaultFormModel();
      handleUpdateFormModel(defaultFormModel);
    },
    edit: () => {
      if (props.editData) {
        handleUpdateFormModel(props.editData);
      }
    }
  };

  handlers[props.type]();
}

async function handleSubmit() {
  await formRef.value?.validate();
  window.$message?.success('성공적으로 추가되었습니다!');
  closeModal();
}

watch(
  () => props.visible,
  newValue => {
    if (newValue) {
      handleUpdateFormModelByModalType();
    }
  }
);
</script>

<style scoped></style>
