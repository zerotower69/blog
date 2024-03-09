<script setup lang="ts">
import { readonly } from "vue";

const navBtns = readonly<{ name: string; link: string }[]>([
  {
    name: "文章",
    link: "/blog",
  },
  {
    name: "留言",
    link: "/message",
  },
  {
    name: "友链",
    link: "/links",
  },
  {
    name: "建站",
    link: "/logs",
  },
  {
    name: "关于",
    link: "/about",
  },
]);
import { HomeOutlined, SettingOutlined } from "@ant-design/icons-vue";
</script>

<template>
  <nav class="w-100% h-[60px] bg-[rgb(157,222,255)]">
    <div
      class="w-100% h-100% flex items-center px-[100px] box-border justify-between"
    >
      <div class="home-btn">
        <HomeOutlined class="nav-icon" />
      </div>
      <div class="page-btn flex gap-[10px]">
        <div class="btn-item" v-for="(btn, index) in navBtns" :key="index">
          <router-link :to="btn.link">{{ btn.name }}</router-link>
        </div>
      </div>
      <div class="left-btn h-100% flex items-center">
        <SettingOutlined class="nav-icon" />
      </div>
    </div>
  </nav>
</template>

<style scoped lang="less">
.btn-item {
  a {
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    border-radius: 14px;
    color: black;
    font-size: 22px;
    font-weight: bold;
    padding: 10px 15px;
  }
  &:hover,
  &.active {
    a {
      background-color: #62a4da;
    }
  }
}
.nav-icon {
  font-size: 30px;
}
</style>
