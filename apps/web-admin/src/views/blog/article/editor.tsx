//@ts-ignore
import { Editor, Viewer } from '@bytemd/vue-next';
import gfm from '@bytemd/plugin-gfm';
import breaks from '@bytemd/plugin-breaks';
import frontMatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import mermaid from '@bytemd/plugin-mermaid';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import 'bytemd/dist/index.css';
import zh from 'bytemd/locales/zh_Hans.json';
import { defineComponent } from 'vue';
import { useVModel } from '@vueuse/core';

const plugins = [
  gfm(),
  breaks(),
  frontMatter(),
  gemoji(),
  highlight(),
  math(),
  mermaid(),
  mediumZoom(),
];

export const ZEditor = defineComponent({
  components: {
    //@ts-ignore
    Editor,
    //@ts-ignore
    Viewer,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const value = useVModel(props, 'modelValue');
    function handleChange(v: string) {
      value.value = v;
    }
    return () => (
      //@ts-ignore
      <Editor
        class="h-full"
        value={value.value}
        locale={zh}
        plugins={plugins}
        onChange={handleChange}
      />
    );
  },
});

export const ZViewer = defineComponent({
  props: {},
  setup(props) {
    return () => (
      //@ts-ignore
      <Viewer plugins={plugins} />
    );
  },
});
