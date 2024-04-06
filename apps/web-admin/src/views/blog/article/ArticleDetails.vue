<script setup lang="ts">
  import { ref } from 'vue';
  import { ZViewer } from '@zerotower/editor';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { useModalInner } from '@/components/Modal';
  import { getArticleDetailsApi } from '@/api/blog/article';

  const props = defineProps({
    detailsId: {
      type: String,
      required: true,
    },
  });

  const blogState = ref<Recordable>({
    content: '',
  });

  const [registerModal, { setModalProps }] = useModalInner();
  const emits = defineEmits(['register']);

  function getArtcileDetails() {
    getArticleDetailsApi(props.detailsId).then((data) => {
      blogState.value = data;
      setModalProps({
        title: data.title,
        minHeight: 300,
        width: 700,
        maskStyle: {},
      });
    });
  }

  function handleOpen(open: boolean) {
    if (open) {
      getArtcileDetails();
    }
  }
</script>

<template>
  <BasicModal @v-bind="$attrs" @register="registerModal" title="文章详情" @open-change="handleOpen">
    <ZViewer :content="blogState.content" />
  </BasicModal>
</template>

<style scoped lang="less"></style>
