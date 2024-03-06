// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "@unocss/nuxt"],
  devServer: {
    host: "0.0.0.0",
    port: 8080,
  },
  vite: {
    plugins: [],
    server: {
      hmr: true,
    },
  },
  unocss: {},
});
