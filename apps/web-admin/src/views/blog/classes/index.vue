<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleAddData">新增分类</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑分类',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除该分类',
                popConfirm: {
                  title: '是否确认删除该分类',
                  placement: 'top',
                  confirm: handleDelete.bind(null, record.id),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ClassModal
      :title="modalType === 'add' ? '新增分类' : '修改分类'"
      :type="modalType"
      :data="editData"
      @register="registerModal"
      @success="reload"
    />
  </PageWrapper>
</template>
<script setup lang="ts">
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { deleteClassApi, getClassListApi } from '@/api/blog/classes';
  import { columns, searchFormSchema } from './class.data';
  import { ref } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { isArray } from 'lodash-es';
  import ClassModal from '@/views/blog/classes/ClassModal.vue';
  import { useModal } from '@/components/Modal';

  defineOptions({ name: 'ClassManagement' });

  const { createMessage } = useMessage();

  const [registerTable, { reload }] = useTable({
    title: '分类列表',
    api: getClassListApi,
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
    //调用接口前处理
    beforeFetch(info) {
      const { createdTime } = info;
      if (isArray(createdTime)) {
        info.startTime = createdTime[0];
        info.endTime = createdTime[1];
      }
      delete info.createdTime;
      return info;
    },
    loading: true,
  });

  const modalType = ref<'add' | 'edit'>('add');

  const [registerModal, { openModal, closeModal }] = useModal();

  //编辑的数据
  const editData = ref({});
  const editId = ref('');

  //编辑
  function handleEdit(data: Recordable) {
    modalType.value = 'edit';
    editData.value = data;
    editId.value = data.id;
    openModal(true, data);
  }

  function handleAddData() {
    modalType.value = 'add';
    openModal(true, editData.value);
  }

  function handleDelete(id: number) {
    deleteClassApi(id).then(() => {
      createMessage.success('删除分类成功');
      reload();
    });
  }
</script>

<style scoped lang="less"></style>
