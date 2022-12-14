<template>
  <n-grid :x-gap="16" :y-gap="16" :item-responsive="true">
    <n-grid-item span="0:24 640:24 1024:8">
      <n-card title="타임 라인" :bordered="false" class="rounded-16px shadow-sm">
        <div class="h-360px">
          <n-timeline>
            <n-timeline-item v-for="item in timelines" :key="item.type" v-bind="item" />
          </n-timeline>
        </div>
      </n-card>
    </n-grid-item>
    <n-grid-item span="0:24 640:24 1024:16">
      <n-card title="시트" :bordered="false" class="rounded-16px shadow-sm">
        <div class="h-360px">
          <n-data-table size="small" :columns="columns" :data="tableData" />
        </div>
      </n-card>
    </n-grid-item>
  </n-grid>
</template>

<script setup lang="ts">
import { h } from 'vue';
import { NTag } from 'naive-ui';

defineOptions({ name: 'DashboardAnalysisBottomPart' });

interface TimelineData {
  type: 'default' | 'info' | 'success' | 'warning' | 'error';
  title: string;
  content: string;
  time: string;
}

interface TableData {
  key: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const timelines: TimelineData[] = [
  { type: 'default', title: '무엇', content: '', time: '2021-10-10 20:46' },
  { type: 'success', title: '성공', content: '성공할 곳', time: '2021-10-10 20:46' },
  { type: 'error', title: '실수', content: '잘못된 곳', time: '2021-10-10 20:46' },
  { type: 'warning', title: '경고하다', content: '경고할곳', time: '2021-10-10 20:46' },
  { type: 'info', title: '정보', content: '예', time: '2021-10-10 20:46' }
];

const columns = [
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  },
  {
    title: 'Address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    render(row: TableData) {
      const tags = row.tags.map(tagKey => {
        return h(
          NTag,
          {
            style: {
              marginRight: '6px'
            },
            type: 'info'
          },
          {
            default: () => tagKey
          }
        );
      });
      return tags;
    }
  }
];

const tableData: TableData[] = [
  {
    key: 0,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: 1,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['wow']
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  },
  {
    key: 3,
    name: 'innerS',
    age: 25,
    address: 'China Shenzhen',
    tags: ['handsome', 'programmer']
  },
  {
    key: 4,
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: 5,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['wow']
  },
  {
    key: 6,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
];
</script>

<style scoped></style>
