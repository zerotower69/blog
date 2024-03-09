<script setup lang="ts">
import { readonly } from "vue";
import { useRuntimeConfig } from "nuxt/app";
const config = useRuntimeConfig()?.public ?? {};

const footerTags = readonly<{ name: string; link: string }[]>([
  {
    name: "Vue3",
    link: "https://vuejs.org/",
  },
  {
    name: "Pinia",
    link: "",
  },
  {
    name: "NestJS",
    link: "",
  },
]);
</script>

<template>
  <footer class="app-footer w-100% min-h-[120px] flex flex-col">
    <div class="info f-c-c">
      <span>个人博客系统</span
      ><a
        class="decoration-none text-black hover:text-[#62a4da]"
        href="http://github.com/zerotower69/blog"
        >「源代码」</a
      >
    </div>
    <div class="icp f-c-c">
      <span>{{ config.ICP_CODE }}</span>
    </div>
    <div class="tags f-c-c gap-[10px]">
      <a
        class="tag-item"
        v-for="(tag, index) in footerTags"
        :key="index"
        :href="tag.link"
        target="_blank"
      >
        {{ tag.name }}
      </a>
    </div>
  </footer>
</template>

<style scoped lang="less">
.tag-item {
  text-decoration: none;
  color: black;
  padding: 2px 8px;
  border-radius: 6px;
  background-color: rgb(185, 232, 255);
  &:hover {
    background-color: #62a4da;
  }
}
</style>
