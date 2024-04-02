<template>
  <BasicDrawer
    @v-bind="$attrs"
    :title="(editType === 'add' ? '发布' : '更新') + '文章'"
    @register="registerDrawer"
  >
    <Form :model="formState" label-align="left">
      <FormItem label="分类：" key="classId" required>
        <ClassSelect v-model:value="formState.classId" />
      </FormItem>
      <FormItem label="添加标签：" key="tagId" required>
        <TagSelect v-model:value="formState.tagId" />
      </FormItem>
      <FormItem label="文章封面：" key="banner">
        <BannerUpload v-model:value="formState.banner" />
      </FormItem>
      <FormItem label="文章类型：" key="type" required>
        <RadioGroup
          v-model:value="formState.type"
          :options="[
            { label: '原创', value: 'origin' },
            { label: '转载', value: 'others' },
          ]"
        />
      </FormItem>
      <FormItem v-if="formState.type === 'others'" label="原文链接" required key="origin_link">
        <Textarea v-model:value="formState.origin_link" placeholder="请输入原文链接" allow-clear />
      </FormItem>
      <FormItem label="编辑摘要：" key="abstract" required>
        <Textarea
          v-model:value="formState.abstract"
          :maxlength="100"
          showCount
          :auto-size="false"
          placeholder="请输入摘要"
          :rows="6"
          allow-clear
        />
      </FormItem>
      <FormItem>
        <div class="flex justify-end gap-10">
          <Button danger @click="handleCancel" :loading="btnLoading">取消</Button>
          <Button type="primary" @click="handleConfirm" :loading="btnLoading">{{
            `确认并${editType === 'add' ? '发布' : '更新'}`
          }}</Button>
        </div>
      </FormItem>
    </Form>
  </BasicDrawer>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useVModel } from '@vueuse/core';
  import BasicDrawer from '@/components/Drawer/src/BasicDrawer.vue';
  import { useDrawerInner } from '@/components/Drawer';
  import { Form, FormItem, RadioGroup, Textarea, Button, message } from 'ant-design-vue';
  import TagSelect from '@/views/blog/article/components/TagSelect.vue';
  import ClassSelect from '@/views/blog/article/components/ClassSelect.vue';
  import BannerUpload from '@/views/blog/article/components/BannerUpload.vue';
  import { addArticleApi, updateArticleApi } from '@/api/blog/article';
  import { AddOrUpdateArticleParams } from '@/api/blog/model/articleModel';

  const props = defineProps({
    editType: {
      type: String as PropType<'add' | 'update'>,
      required: true,
    },
    data: {
      type: Object as PropType<Recordable>,
      required: true,
    },
  });

  const emits = defineEmits(['register']);

  const router = useRouter();

  //表单数据
  const formState = useVModel(props, 'data');

  const [registerDrawer, { closeDrawer, setDrawerProps }] = useDrawerInner();
  onMounted(() => {
    setDrawerProps({
      width: 500,
    });
  });
  //按钮加载态
  const btnLoading = ref(false);

  //确认更新或者发布
  function handleConfirm() {
    //TODO:校验Form表单
    const type = props.editType;
    switch (type) {
      case 'add':
        {
          btnLoading.value = true;
          //新增逻辑
          addArticleApi(formState.value as AddOrUpdateArticleParams)
            .then((data) => {
              message.success('发布文章成功');
              //TODO：发布成功后，提供查看详情或者返回列表的交互选项
              router.push(`/blog/article/edit/${data.id}`);
            })
            .finally(() => {
              btnLoading.value = false;
            });
        }
        break;
      case 'update':
        {
          btnLoading.value = true;
          //更新逻辑
          updateArticleApi(formState.value as AddOrUpdateArticleParams)
            .then((data) => {
              message.success('更新文章成功');
              // closeDrawer();
            })
            .finally(() => {
              btnLoading.value = false;
            });
        }
        break;
    }
  }
  //取消
  function handleCancel() {
    closeDrawer();
  }
</script>

<style scoped lang="less"></style>
