<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" @edit-end="handleEdit">
      <template #toolbar>
        <a-button type="primary" @click="openModal(true)">新增标签</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除该标签',
                popConfirm: {
                  title: '是否确认删除该标签',
                  placement: 'top',
                  confirm: handleDelete.bind(null, record.id),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <BasicModal @register="registerModal" @ok="handleCreate">
      <div class="flex align-center">
        <div class="w-20">标签名：</div>
        <div class="flex-1">
          <a-input v-model:value="addTagName" allow-clear />
        </div>
      </div>
    </BasicModal>
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { addTagApi, deleteTagApi, getTagListApi, updateTagApi } from '@/api/blog/tag';
  import { columns, searchFormSchema } from './tag.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useModal } from '@/components/Modal';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';

  defineOptions({
    name: 'TagManagement',
  });

  const { createMessage } = useMessage();

  //使用表格
  const [registerTable, { reload }] = useTable({
    title: '标签列表',
    api: getTagListApi,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });
  const [registerModal, { openModal, closeModal }] = useModal();

  //新增标签名
  const addTagName = ref('');

  function handleCreate() {
    if (addTagName.value === '') {
      createMessage.warn('标签名不能为空');
    } else {
      addTagApi(addTagName.value).then(() => {
        createMessage.success('新增标签成功');
        reload().finally(() => {
          closeModal();
        });
      });
    }
  }
  function handleDelete(id: number) {
    deleteTagApi(id.toString()).then(() => {
      createMessage.success('删除成功');
      reload();
    });
  }
  function handleEdit({ record, index, key, value }) {
    console.log(arguments[0]);
    if (key === 'name') {
      //修改标签名
      updateTagApi({
        id: record.id,
        name: value,
      })
        .then(() => {
          createMessage.success('更改成功');
        })
        .catch(() => {});
    }
  }
</script>

<style scoped lang="less"></style>
