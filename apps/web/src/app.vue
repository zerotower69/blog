<script setup lang="ts"></script>

<template>
  <a-config-provider>
    <div ref="boxRef" class="AppBox">
      <client-only>
        <nuxt-layout name="header" />
      </client-only>
      <main class="AppMain">
        <NuxtPage />
      </main>
      <nuxt-layout name="footer" />
    </div>
  </a-config-provider>
</template>

<style lang="less">
@import "@/styles/global";
.AppBox {
  background-image: url("@/assets/images/bg/light.webp");
  background-attachment: fixed;
  background-position: center 0;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>
