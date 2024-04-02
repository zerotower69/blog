<template>
  <BasicModal
    @v-bind="$attrs"
    @register="registerModal"
    @open-change="handleOpen"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script setup lang="ts">
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form';
  import { classFormScheme } from './class.data';
  import { useMessage } from '@/hooks/web/useMessage';
  import { addClassApi, updateClassApi } from '@/api/blog/classes';
  import { nextTick } from 'vue';
  import { cloneDeep } from 'lodash-es';

  const { createMessage } = useMessage();

  const props = defineProps({
    type: String as PropType<'edit' | 'add'>,
    data: {
      type: Object as PropType<Recordable>,
      default: () => ({}),
    },
    dataId: Number,
  });
  //edit-ok表示成功，通知表格刷新
  const emits = defineEmits(['success', 'register']);

  const [registerModal, { closeModal }] = useModalInner();
  const [registerForm, { resetFields, validate, setFieldsValue }] = useForm({
    labelWidth: 100,
    schemas: classFormScheme,
    baseColProps: { span: 24 },
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  function handleOpen(open: boolean) {
    if (open && props.type === 'edit') {
      nextTick(() => {
        setFieldsValue(cloneDeep(props.data));
      });
    }
    if (!open) {
      resetFields();
    }
  }

  async function handleSubmit() {
    try {
      const data = await validate();
      if (props.type === 'add') {
        addClassApi(data).then(() => {
          createMessage.success('新增分类成功');
          emits('success');
          resetFields();
          closeModal();
        });
      } else if (props.type === 'edit') {
        data.id = props.data.id;
        updateClassApi(data).then(() => {
          createMessage.success('修改分类成功');
          emits('success');
          resetFields();
          closeModal();
        });
      }
    } catch (e) {
      createMessage.error('数据验证失败');
    }
  }
</script>

<style scoped lang="less"></style>
