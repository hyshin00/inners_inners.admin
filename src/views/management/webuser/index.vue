<template>
  <n-card title="웹사용자 관리" :bordered="false" class="rounded-16px shadow-sm">
    <n-space class="pb-12px" justify="space-between">
      <n-space>
        <n-button type="primary" @click="handleAddTable">
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
import { NButton, NPopconfirm, NSpace, NTag } from 'naive-ui';
import type { DataTableColumns, PaginationProps } from 'naive-ui';
import moment from 'moment';
import { fetchWebUserList, deleteWebUser } from '@/service';
import { useBoolean, useLoading } from '@/hooks';
import { userAuthLabels } from '@/constants';
import TableActionModal from './components/TableActionModal.vue';
import type { ModalType } from './components/TableActionModal.vue';
import ColumnSetting from './components/ColumnSetting.vue';

const { loading, startLoading, endLoading } = useLoading(false);
const { bool: visible, setTrue: openModal } = useBoolean();

const tableData = ref<UserManagement.WebUser[]>([]);
function setTableData(data: UserManagement.WebUser[]) {
  tableData.value = data;
}

async function onSaveSuccess() {
  console.log('on save success');
  await getTableData();
}

async function getTableData() {
  startLoading();
  const { data } = await fetchWebUserList();
  if (data) {
    setTimeout(() => {
      setTableData(data);
      endLoading();
    }, 1000);
  }
}

const columns: Ref<DataTableColumns<UserManagement.WebUser>> = ref([
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
    key: 'username',
    title: '사용자 이름',
    align: 'center'
  },
  {
    key: 'name',
    title: '이름',
    align: 'center'
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
    key: 'updatedTime',
    title: '수정일시',
    align: 'center',
    render(rowData) {
      if (rowData.updatedTime) return moment(rowData.updatedTime).format('YYYY-MM-DD HH:mm:ss');
      return '';
    }
  },
  // {
  //   key: 'auth',
  //   title: '권한',
  //   align: 'center'
  // },
  // {
  //   key: 'gender',
  //   title: '성별',
  //   align: 'center',
  //   render: row => {
  //     if (row.gender) {
  //       const tagTypes: Record<UserManagement.GenderKey, NaiveUI.ThemeColor> = {
  //         '0': 'success',
  //         '1': 'warning'
  //       };

  //       return <NTag type={tagTypes[row.gender]}>{genderLabels[row.gender]}</NTag>;
  //     }

  //     return <span></span>;
  //   }
  // },
  {
    key: 'auth',
    title: '권한',
    align: 'center',
    render: row => {
      if (row.auth) {
        const tagTypes: Record<UserManagement.UserAuthKey, NaiveUI.ThemeColor> = {
          admin: 'success',
          user: 'default'
        };

        return <NTag type={tagTypes[row.auth]}>{userAuthLabels[row.auth]}</NTag>;
      }
      return <span></span>;
    }
  },
  {
    key: 'actions',
    title: '작업',
    align: 'center',
    render: row => {
      return (
        <NSpace justify={'center'}>
          <NButton size={'small'} onClick={() => handleEditTable(row.id)}>
            편집
          </NButton>
          <NPopconfirm onPositiveClick={() => handleDeleteTable(row.id)}>
            {{
              default: () => '삭제하시겠습니까?',
              trigger: () => <NButton size={'small'}>삭제</NButton>
            }}
          </NPopconfirm>
        </NSpace>
      );
    }
  }
]) as Ref<DataTableColumns<UserManagement.WebUser>>;

const modalType = ref<ModalType>('add');

function setModalType(type: ModalType) {
  modalType.value = type;
}

const editData = ref<UserManagement.WebUser | null>(null);

function setEditData(data: UserManagement.WebUser | null) {
  editData.value = data;
}

function handleAddTable() {
  openModal();
  setModalType('add');
}

function handleEditTable(id: number) {
  const findItem = tableData.value.find(item => item.id === id);

  console.log('Edit Item ', findItem);

  if (findItem) {
    setEditData(findItem);
  }
  setModalType('edit');
  openModal();
}

async function handleDeleteTable(id: number) {
  const result = await deleteWebUser(id);

  console.log('delete result', result);
  window.$message?.info(`삭제되었습니다.`);

  getTableData();
}

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

function init() {
  getTableData();
}

// 초기화
init();
</script>

<style scoped></style>
