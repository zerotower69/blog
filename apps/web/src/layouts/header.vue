<script setup lang="ts">
import { computed, type CSSProperties, onMounted, readonly, watch } from "vue";
import { useScroll } from "@vueuse/core";
import { HomeOutlined, SettingOutlined } from "@ant-design/icons-vue";
import { useAppStore } from "~/store/app";

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
const { isScrolling, directions, y } = useScroll(document);
const appStore = useAppStore();
watch(
  () => isScrolling.value,
  (scrolling) => {
    console.log(scrolling, document.body);
    if (scrolling) {
      if (directions.top) {
        appStore.setHeader(true);
      } else if (directions.bottom) {
        appStore.setHeader(false);
      }
    }
  }
);
const navStyle = computed<CSSProperties>(() => ({
  transform: `translateY(${appStore.showHeader ? "0" : "-60px"})`,
}));
onMounted(() => {});
</script>

<template>
  <nav class="AppHeader" :style="navStyle">
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
