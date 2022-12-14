<template>
  <n-card title="모바일 RSSI 관리" :bordered="false" class="rounded-16px shadow-sm">
    <n-space class="pb-12px" justify="space-between">
      <n-space>
        <n-button type="primary" @click="onAddData">
          <icon-ic-round-plus class="mr-4px text-20px" />
          신규
        </n-button>
        <n-button type="error">
          <icon-ic-round-delete class="mr-4px text-20px" />
          삭제
        </n-button>
        <n-button type="success">
          <icon-uil:export class="mr-4px text-20px" />
          Excel로 내보내기
        </n-button>
      </n-space>
      <n-space align="center" :size="18">
        <n-button size="small" type="primary" @click="getTableData">
          <icon-mdi-refresh class="mr-4px text-16px" :class="{ 'animate-spin': loading }" />
          새로 고침
        </n-button>
        <column-setting v-model:columns="columns" />
      </n-space>
    </n-space>
    <n-data-table :columns="columns" :data="tableData" :loading="loading" :pagination="pagination" />
    <table-action-modal
      v-model:visible="visible"
      :type="modalType"
      :edit-data="editData"
      @on-save-success="onSaveSuccess"
    />
  </n-card>
</template>

<script setup lang="tsx">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import type { DataTableColumns, PaginationProps } from 'naive-ui';
import { NButton, NPopconfirm, NSpace } from 'naive-ui';
import moment from 'moment';
import { useBoolean, useLoading } from '@/hooks';
import { getList, deleteData } from '~/src/service/api/management/MobileRssi';
import TableActionModal from './TableActionModal.vue';
import type { ModalType } from './TableActionModal.vue';
const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const pagination: PaginationProps = reactive({
  page: 1,
  pageSize: 10,
  showSizePicker: true,
  pageSizes: [10, 15, 20, 25, 30],
  onChange: (page: number) => {
    pagination.page = page;
  },
  onUpdatePageSize: (pageSize: number) => {
    pagination.pageSize = pageSize;
    pagination.page = 1;
  }
});

const modalType = ref<ModalType>('add');

const tableData = ref<Management.MobileRssi[]>([]);

const editData = ref<Management.MobileRssi | null>(null);

const getTableData = async () => {
  startLoading();
  const { data } = await getList();
  if (data) {
    setTimeout(() => {
      tableData.value = data;
      endLoading();
    }, 1000);
  }
};

const onEditData = (id: number) => {
  const findItem = tableData.value.find(item => item.id === id);

  console.log('Edit Item ', findItem);

  if (findItem) {
    editData.value = findItem;
  }
  modalType.value = 'edit';
  openModal();
};

const onDeleteData = async (id: number) => {
  const result = await deleteData(id);

  console.log('delete result', result);
  window.$message?.info(`삭제되었습니다.`);

  getTableData();
};

const onAddData = async () => {
  openModal();
};

const columns: Ref<DataTableColumns<Management.MobileRssi>> = ref([
  {
    type: 'selection',
    align: 'center'
  },
  {
    key: 'id',
    title: '일련 번호',
    align: 'center'
  },
  {
    key: 'deviceName',
    title: '기기명',
    align: 'center'
  },
  {
    key: 'deviceModel',
    title: '기기 모델명',
    align: 'center'
  },
  {
    key: 'osVersioin',
    title: '기기 OS 버전',
    align: 'right'
  },
  {
    key: 'rssiCal',
    title: 'RF 보상값',
    align: 'right'
  },
  {
    key: 'createdTime',
    title: '생성일시',
    align: 'center',
    render(rowData) {
      if (rowData.createdTime) return moment(rowData.createdTime).format('YYYY-MM-DD HH:mm:ss');
      return '';
    }
  },
  {
    key: 'actions',
    title: '작업',
    align: 'center',
    render: row => {
      return (
        <NSpace justify={'center'}>
          <NButton size={'small'} onClick={() => onEditData(row.id)}>
            편집
          </NButton>
          <NPopconfirm onPositiveClick={() => onDeleteData(row.id)}>
            {{
              default: () => '삭제하시겠습니까?',
              trigger: () => <NButton size={'small'}>삭제</NButton>
            }}
          </NPopconfirm>
        </NSpace>
      );
    }
  }
]) as Ref<DataTableColumns<Management.MobileRssi>>;

const onSaveSuccess = async () => {
  console.log('on save success');
  await getTableData();
};

const init = () => {
  getTableData();
};

init();
</script>

<style scoped></style>
