//@ts-ignore
import { Editor, Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import breaks from "@bytemd/plugin-breaks";
import frontMatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import mathHans from "@bytemd/plugin-math/locales/zh_Hans.json";
import mermaid from "@bytemd/plugin-mermaid";
import mermaidHans from "@bytemd/plugin-mermaid/locales/zh_Hans.json";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import "bytemd/dist/index.css";
import zhHans from "bytemd/locales/zh_Hans.json";
import { defineComponent, PropType } from "vue";
import { useVModel } from "@vueuse/core";
import { autoHighlightPlugin, autoThemePlugin } from "./plugins";
import type { BytemdPlugin } from "bytemd";

const defaultPlugins = [
  gfm(),
  breaks(),
  frontMatter(),
  gemoji(),
  highlight(),
  math({
    locale: mathHans,
  }),
  mermaid({
    locale: mermaidHans,
  }),
  mediumZoom(),
  //自定义插件
  autoThemePlugin(), //根据theme: xxx 决定应用的样式
  autoHighlightPlugin(),
];

//封装编辑器
export const ZEditor = defineComponent({
  components: {
    //@ts-ignore
    Editor,
    //@ts-ignore
    Viewer,
  },
  props: {
    value: {
      type: String,
      default: "",
    },
    plugins: {
      type: Array as PropType<BytemdPlugin[]>,
      default: () => defaultPlugins,
    },
    uploadImages: Function as PropType<(file: File[]) => Promise<{ title: string; url: string }[]>>,
  },
  setup(props) {
    const content = useVModel(props, "value");
    function handleChange(v: string) {
      content.value = v;
    }
    function uploadImageFn(file: File[]) {
      if (props.uploadImages) {
        return props.uploadImages(file);
      } else {
        return [];
      }
    }
    return () => (
      //@ts-ignore
      <Editor
        value={content.value}
        locale={zhHans}
        plugins={props.plugins}
        onChange={handleChange}
        uploadImages={uploadImageFn}
      />
    );
  },
});

//封装预览页面
export const ZViewer = defineComponent({
  props: {
    //文章内容
    content: {
      type: String,
      required: true,
    },
    //插件
    plugins: {
      type: Array as PropType<BytemdPlugin[]>,
      default: () => defaultPlugins,
    },
    tabIndex: {
      type: Number,
      default: 2,
    },
    sanitize: {
      type: Number,
      default: 23,
    },
  },
  setup(props) {
    return () => (
      //@ts-ignore
      <Viewer value={props.content} locale={zhHans} plugins={props.plugins} tabIndex={props.tabIndex} sanitize={props.sanitize} />
    );
  },
});
