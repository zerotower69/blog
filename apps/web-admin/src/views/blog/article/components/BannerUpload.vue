<template>
  <div class="banner-uploader">
    <div class="img-box relative" v-if="uploadLink">
      <DeleteOutlined
        class="absolute right-0 top-0 cursor-pointer text-[20px] hover:text-gray"
        @click="uploadLink = ''"
      />
      <img :src="uploadLink" alt="banner" />
    </div>
    <div v-else>
      <Upload
        v-model:file-list="fileList"
        name="image"
        list-type="picture-card"
        class="banner-uploader"
        action="/basic-api/file/image/upload"
        accept=".jpg,.jpeg,.png,.gif"
        :show-upload-list="false"
        @before-upload="beforeUpload"
        @change="handleChange"
      >
        <div>
          <LoadingOutlined v-if="loading" />
          <PlusOutlined v-else />
          <div class="text-gray">上传封面</div>
        </div>
      </Upload>
      <div class="text-gray">建议尺寸：192*168px</div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useVModel } from '@vueuse/core';
  import { Upload, message } from 'ant-design-vue';
  import type { UploadFile, UploadChangeParam } from 'ant-design-vue';
  import { PlusOutlined, LoadingOutlined, DeleteOutlined } from '@ant-design/icons-vue';

  const props = defineProps({
    value: {
      type: String as PropType<string>,
      default: '',
    },
  });
  const uploadLink = useVModel(props, 'value');

  const fileList = ref([]);
  //上传中
  const loading = ref(false);
  onMounted(() => {});

  //上传前干点什么
  function beforeUpload(file: UploadFile) {
    //校验图片格式
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = (file.size as number) / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }
  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  }

  //当上传状态改变时触发
  function handleChange(info: UploadChangeParam) {
    if (info.file.status === 'uploading') {
      loading.value = true;
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      console.log('上传成功信息', info);
      const url = info?.file?.response?.data?.url;
      if (url) {
        uploadLink.value = url;
      } else {
        message.error('上传封面失败！');
      }
      loading.value = false;
    }
    if (info.file.status === 'error') {
      loading.value = false;
      message.error('上传封面失败！');
    }
  }
</script>

<style lang="less">
  .banner-uploader {
    .ant-upload {
      width: 192px !important;
      height: 168px !important;
    }
    .img-box,
    img {
      width: 192px;
      height: 168px;
    }
    .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }
  }
</style>
