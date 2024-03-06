import {
  defineConfig,
  presetAttributify,
  presetUno,
  presetIcons,
} from "unocss";

import { FileSystemIconLoader } from "@iconify/utils/lib/loader/node-loaders";
export default defineConfig({
  presets: [
    presetAttributify({
      /* preset options */
    }),
    presetUno(),
    presetIcons({
      collections: {
        antd: () => import("@iconify-icons/ant-design").then((i) => i.default),
        custom: FileSystemIconLoader("./assets/icons", (svg) =>
          svg.replace(/#fff/, "currentColor"),
        ),
      },
    }),
  ],
  shortcuts: {
    "f-c-c": "flex justify-center items-center",
  },
});
