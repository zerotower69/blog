import dotenv from "dotenv";
import path from "path";
dotenv.config({
  path: path.resolve(__dirname, ".env." + process.env.NODE_ENV),
});
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  srcDir: "src",
  devtools: { enabled: true },
  modules: ["@pinia/nuxt", "@vueuse/nuxt", "@unocss/nuxt"],
  devServer: {
    host: "0.0.0.0",
    port: 8080,
  },
  runtimeConfig: {
    public: {
      ICP_CODE: process.env.ICP_CODE,
    },
  },
  vite: {
    plugins: [],
    server: {
      hmr: true,
    },
  },
  unocss: {},
});
