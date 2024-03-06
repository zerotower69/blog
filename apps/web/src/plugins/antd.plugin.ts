import { defineNuxtPlugin } from "#app";
import antd from "ant-design-vue";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(antd);
});
