//@ts-ignore
import { Editor, Viewer } from '@bytemd/vue-next';
import gfm from '@bytemd/plugin-gfm';
import breaks from '@bytemd/plugin-breaks';
import frontMatter from '@bytemd/plugin-frontmatter';
import gemoji from '@bytemd/plugin-gemoji';
import highlight from '@bytemd/plugin-highlight';
import math from '@bytemd/plugin-math';
import mathHans from '@bytemd/plugin-math/locales/zh_Hans.json';
import mermaid from '@bytemd/plugin-mermaid';
import mermaidHans from '@bytemd/plugin-mermaid/locales/zh_Hans.json';
import mediumZoom from '@bytemd/plugin-medium-zoom';
import 'bytemd/dist/index.css';
import 'juejin-markdown-themes/dist/juejin.min.css';
import themes from 'juejin-markdown-themes';
import zhHans from 'bytemd/locales/zh_Hans.json';
import { defineComponent, toRefs } from 'vue';
import { useVModel } from '@vueuse/core';
import { uploadImageApi } from '@/api/file/image';
import { BytemdAction, BytemdPlugin } from 'bytemd';
import { isObject } from 'lodash-es';
import { icons } from './icons';

const plugins = [
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
    async function uploadImages(files: File[]) {
      console.log(files);
      const promises = files.map((file) => uploadImageApi(file));
      const list = await Promise.allSettled(promises);
      const res: { title: string; url: string }[] = [];
      list.forEach((item, index) => {
        if (item.status === 'fulfilled') {
          res.push({
            title: files[index].name,
            url: item?.value?.url ?? '',
          });
        }
      });
      return res;
    }
    return () => (
      //@ts-ignore
      <Editor
        class="h-full"
        value={value.value}
        locale={zhHans}
        plugins={plugins}
        onChange={handleChange}
        uploadImages={uploadImages}
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
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
  render() {
    return (
      //@ts-ignore
      <Viewer value={this.content} locale={zhHans} plugins={plugins} tabIndex={2} sanitize={23} />
    );
  },
});
//自动应用主题
function autoThemePlugin(): BytemdPlugin {
  const actionItems: BytemdAction[] = Object.keys(themes).map((key) => {
    return {
      title: key,
      handler: {
        type: 'action',
        click: ({ editor, codemirror, appendBlock }) => {
          const text = editor.getValue();
          const searchRegExp = /^---(.|\n)*?---/;
          let newText = '';
          if (searchRegExp.test(text)) {
            //有 formatter
            let res = text.match(searchRegExp)?.[0];
            if (res) {
              if (res.indexOf('theme:') > -1) {
                //原来就有主题配置
                //替换配置
                const newRes = res.replace(/theme:\s+(.*?)\n/, `theme: ${key}\n`);
                newText = newRes + text.replace(res, '');
              } else {
                //原来没有主题配置，但是有formatter
                const newRes = res.replace(
                  /---\n((.|\n)+---)/,
                  `---
                   theme: ${key}\n` + '$1',
                );
                newText = newRes + text.replace(res, '');
              }
            }
          }
          if (!newText) {
            newText = `---\ntheme: ${key}\n---\n\n` + text;
          }
          editor.setValue(newText);
        },
      },
    } as BytemdAction;
  });

  return {
    //就是渲染视图引入不同的主题样式
    viewerEffect({ file }) {
      if (!isObject(file)) {
        return;
      }
      const $style = document.createElement('style');
      try {
        $style.innerHTML =
          themes[(file?.frontmatter as any)?.theme ?? '']?.style ?? themes.jujin.style;
      } catch (e) {
        $style.innerHTML = themes.juejin.style;
      }
      document.querySelector('.markdown-body')?.appendChild($style);
      return () => {
        $style?.remove();
      };
    },
    actions: [
      {
        title: 'Markdown主题',
        icon: icons.Theme,
        handler: {
          type: 'dropdown',
          actions: actionItems,
        },
      },
    ],
  };
}

//自动高亮
function autoHighlightPlugin(
  options: {
    //配置默认的CDN链接
    CDN?: string;
    //配置支持的highlight种类
    HIGHLIGHT?: string[];
  } = {},
): BytemdPlugin {
  options = {
    CDN: 'https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles',
    HIGHLIGHT: ['vs', 'a11y-dark', 'agate', 'arta', 'idea'],
    ...options,
  };
  const actionItems =
    options.HIGHLIGHT?.map((key) => {
      return {
        title: key,
        handler: {
          type: 'action',
          click: ({ editor }) => {
            const text = editor.getValue();
            const searchRegExp = /^---(.|\n)*?---/;
            let newText = '';
            if (searchRegExp.test(text)) {
              //有 formatter
              let res = text.match(searchRegExp)?.[0];
              if (res) {
                if (res.indexOf('highlight:') > -1) {
                  //原来就有高亮配置
                  //替换配置
                  const newRes = res.replace(/highlight:\s+(.*?)\n/, `highlight: ${key}\n`);
                  newText = newRes + text.replace(res, '');
                } else {
                  //原来没有高亮配置，但是有formatter
                  const newRes = res.replace(
                    /---\n((.|\n)*---)/,
                    `---\nhighlight: ${key}\n` + '$1',
                  );
                  newText = newRes + text.replace(res, '');
                }
              }
            }
            if (!newText) {
              newText = `---\nhighlight: ${key}\n---\n\n` + text;
            }
            editor.setValue(newText);
          },
        },
      } as BytemdAction;
    }) ?? [];
  //校验合法的CDN地址
  return {
    viewerEffect({ file }) {
      if (!isObject(file)) {
        return;
      }
      const $link = document.createElement('link');
      $link.rel = 'stylesheet';
      const $header = document.getElementsByTagName('head')[0];
      try {
        const highlightName = (file?.frontmatter as any)?.highlight;
        if (!highlightName) {
          throw new Error('');
        }
        const styleLink = (options.CDN as string) + `/${highlightName}.min.css`;
        $link.href = styleLink;
      } catch (e) {
        //使用默认的高亮样式
        $link.href = (options.CDN as string) + `/vs.min.css`;
      }
      $header.appendChild($link);
      return () => {
        $link?.remove();
      };
    },
    actions: [
      {
        title: '代码高亮样式',
        icon: icons.Highlight,
        handler: {
          type: 'dropdown',
          actions: actionItems,
        },
      },
    ],
  };
}
