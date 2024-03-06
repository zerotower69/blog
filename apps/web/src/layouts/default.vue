<script setup lang="ts">
const footerTags = ["Vue3", "nuxt3", "nestjs", "vueuse"];
</script>

<template>
  <a-layout>
    <a-layout-header></a-layout-header>
    <a-layout-content>
      <slot></slot>
    </a-layout-content>
    <a-layout-footer>
      <div
        class="footer-container flex flex-col w-full justify-center items-center"
      >
        <div class="info"></div>
        <div class="tags">
          <a-tag color="blue" v-for="(tag, index) in footerTags">{{
            tag
          }}</a-tag>
        </div>
      </div>
    </a-layout-footer>
  </a-layout>
</template>

<style scoped></style>
