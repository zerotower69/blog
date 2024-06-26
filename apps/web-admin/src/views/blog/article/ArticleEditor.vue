<template>
  <div class="editor-page h-full flex flex-col px-[5px]">
    <div class="title-box flex align-center gap-8">
      <a-input v-model:value="blogState.title" placeholder="请输入文章标题" />
      <div class="btns">
        <a-button v-if="getEditType === 'add'" @click="beforeOpenDrawer" type="primary"
          >发布</a-button
        >
        <a-button v-else type="primary" @click="beforeOpenDrawer">更新</a-button>
      </div>
    </div>
    <div class="byte-editor-box flex-1">
      <ZEditor
        class="h-full"
        v-model:value="blogState.content"
        :upload-images="uploadImages"
        :plugins="[...DEFAULT_PLUGINS, switchTheme(), switchHighlight()]"
      />
    </div>
    <ArticleDrawer @register="registerDrawer" v-model:data="blogState" :edit-type="getEditType" />
  </div>
</template>
<script setup lang="ts">
  import { ref, unref, onMounted, computed } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { message } from 'ant-design-vue';
  import { ZEditor, DEFAULT_PLUGINS } from '@zerotower/editor';
  import switchTheme from '@zerotower/bytemd-plugin-switch-theme';
  import switchHighlight from '@zerotower/bytemd-plugin-switch-highlight';
  import ArticleDrawer from '@/views/blog/article/ArticleDrawer.vue';
  import { useDrawer } from '@/components/Drawer';
  import { getArticleDetailsApi, getWebInfoApi } from '@/api/blog/article';
  import { uploadImageApi } from '@/api/file/image';

  function loadInfo(url: string) {
    return getWebInfoApi(url).then((data) => {
      return data;
    });
  }

  const route = useRoute();
  const router = useRouter();

  const blogState = ref<Recordable>({});
  const [registerDrawer, { openDrawer }] = useDrawer();
  //页面初始化逻辑
  function initPage() {
    if (getEditType.value == 'add') {
      //新增逻辑
      blogState.value = createNewBlog();
    } else if (getEditType.value === 'update') {
      //更新逻辑
      getUpdateArticle();
    }
  }
  //根据路由信息判断是新增还是更改
  const getEditType = computed(() => (route.path.indexOf('article/add') > -1 ? 'add' : 'update'));

  async function uploadImages(files: File[]) {
    const promises = files.map((file) => uploadImageApi(file));
    const list = await Promise.allSettled(promises);
    const res: { title: string; url: string }[] = [];
    list.forEach((item, index) => {
      if (item.status === 'fulfilled') {
        res.push({
          title: files[index].name,
          url: item?.value?.url ?? '',
        });
      }
    });
    return res;
  }

  //新建时创建默认的文章数据
  function createNewBlog() {
    return {
      title: '',
      content: '',
      type: 'origin',
      abstract: '',
      classId: [],
      tagId: [],
    };
  }

  //获取更新的文章
  function getUpdateArticle() {
    try {
      const id = route.params?.id;
      if (!id) {
        message.warning('参数错误');
        throw new Error('id不存在');
      }
      getArticleDetailsApi(id as string)
        .then((data) => {
          blogState.value = data;
        })
        .catch(() => {
          throw new Error('获取文章失败');
        });
    } catch (e) {
      router.go(-1);
    }
  }

  //打开右侧抽屉前做一些数据校验
  function beforeOpenDrawer() {
    const data = unref(blogState);
    if (!data.title) {
      message.warning('请输入文章标题');
      return;
    }
    if (data.content.length == 0) {
      message.warning('文章内容不能为空');
      return;
    }
    //默认摘要信息
    if (!(blogState.value?.abstract?.length ?? 0)) {
      blogState.value.abstract =
        data.content.length <= 100 ? data.content : data.content.substring(0, 100);
    }
    openDrawer(true);
  }

  //TODO：[admin] 生成默认的文章摘要
  function generateArticleAbstract() {}
  onMounted(() => {
    initPage();
  });
</script>

<style lang="less">
  .bytemd-split {
    height: 100%;
  }
</style>
