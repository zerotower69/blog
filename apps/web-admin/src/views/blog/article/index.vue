<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增文章</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:info-standard-line',
                tooltip: '查看文章详情',
                onClick: handleView.bind(null, record),
              },
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑文章',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除该文章',
                popConfirm: {
                  title: '是否确认删除该文章',
                  placement: 'top',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <ArticleDetails @register="registerModal" :details-id="detailsId" />
  </PageWrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { PageWrapper } from '@/components/Page';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { deleteArticleApi, getArticleListApi } from '@/api/blog/article';
  import { columns } from './article.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import ArticleDetails from '@/views/blog/article/ArticleDetails.vue';
  import { useModal } from '@/components/Modal';

  defineOptions({ name: 'ArticleManagement' });

  const { createMessage } = useMessage();
  const router = useRouter();

  const [registerTable, { reload }] = useTable({
    title: '文章列表',
    api: getArticleListApi,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });

  function handleCreate() {
    router.push('/blog/article/add');
  }

  //删除文章
  function handleDelete(record: Recordable) {
    deleteArticleApi(record.id as string, false).then((res) => {
      createMessage.success('删除成功');
      reload();
    });
  }

  const [registerModal, { openModal }] = useModal();
  //详情文章的id
  const detailsId = ref('');
  //点击查看文章详情
  function handleView(record: Recordable) {
    detailsId.value = record.id;
    openModal();
  }
  //打开编辑文章页面
  function handleEdit(record: Recordable) {
    router.push(`/blog/article/edit/${record.id}`);
  }
</script>

<style scoped lang="less"></style>
