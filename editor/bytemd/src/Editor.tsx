//@ts-ignore
import { Editor, Viewer } from "@bytemd/vue-next";
import "./editor.less";
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
import type { BytemdPlugin } from "bytemd";
import zhHans from "bytemd/locales/zh_Hans.json";
import { defineComponent, PropType, computed } from "vue";
import switchTheme from "@zerotower/bytemd-plugin-switch-theme";
import theme_zh from "@zerotower/bytemd-plugin-switch-theme/locales/zh_Hans.json";
import switchHighlight from "@zerotower/bytemd-plugin-switch-highlight";
import copyCode from "@zerotower/bytemd-plugin-copy-code";
import cardLink from "@zerotower/bytemd-plugin-card-link";
// import "@zerotower/bytemd-plugin-card-link/lib/index.css";
import "./card-link.less";

export const DEFAULT_PLUGINS = [
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
];

const plugins = [
  ...DEFAULT_PLUGINS,
  //自定义插件
  switchTheme({
    locale: theme_zh,
  }),
  switchHighlight({
    cdn: ["https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/highlight.js/11.4.0/styles/base16"],
  }),
  copyCode({}),
  cardLink({
    openMode: "blank",
  }),
];

//封装编辑器
export const ZEditor = defineComponent({
  components: {
    //@ts-ignore
    Editor,
  },
  props: {
    //编辑的文档
    value: {
      type: String,
      default: "",
    },
    //插件，默认导入所有的
    plugins: {
      type: Array as PropType<BytemdPlugin[]>,
      default: () => plugins,
    },
    //上传图片
    uploadImages: Function as PropType<(file: File[]) => Promise<{ title: string; url: string }[]>>,
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const content = computed({
      get() {
        return props.value;
      },
      set(val) {
        emit("update:value", val);
      },
    });
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
  components: {
    //@ts-ignore
    Viewer,
  },
  props: {
    //文章内容
    content: {
      type: String,
      required: true,
    },
    //插件
    plugins: {
      type: Array as PropType<BytemdPlugin[]>,
      default: () => plugins,
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
