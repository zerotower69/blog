<script setup lang="ts">
  import { ref } from 'vue';
  import { ZViewer, DEFAULT_PLUGINS } from '@zerotower/editor';
  import BasicModal from '@/components/Modal/src/BasicModal.vue';
  import { useModalInner } from '@/components/Modal';
  import { getArticleDetailsApi, getWebInfoApi } from '@/api/blog/article';
  import cardLink from '@zerotower/bytemd-plugin-card-link';
  import switchTheme from '@zerotower/bytemd-plugin-switch-theme';
  import switchHighlight from '@zerotower/bytemd-plugin-switch-highlight';

  const props = defineProps({
    detailsId: {
      type: String,
      required: true,
    },
  });

  function loadInfo(url: string) {
    return getWebInfoApi(url).then((data) => {
      return data;
    });
  }

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
    <ZViewer
      :content="blogState.content"
      :plugins="[
        ...DEFAULT_PLUGINS,
        cardLink({
          openMode: 'blank',
          loadInfoApi: loadInfo,
        }),
        switchTheme(),
        switchHighlight({}),
      ]"
    />
  </BasicModal>
</template>

<style scoped lang="less"></style>
