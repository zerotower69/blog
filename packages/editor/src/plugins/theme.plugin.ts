import type { BytemdAction, BytemdPlugin } from "bytemd";
import themes from "juejin-markdown-themes";
import { isObject } from "lodash-es";
import { icons } from "./icons";

export function autoThemePlugin(): BytemdPlugin {
  const actionItems: BytemdAction[] = Object.keys(themes).map((key) => {
    return {
      title: key,
      handler: {
        type: "action",
        click: ({ editor, codemirror, appendBlock }) => {
          const text = editor.getValue();
          const searchRegExp = /^---(.|\n)*?---/;
          let newText = "";
          if (searchRegExp.test(text)) {
            //有 formatter
            const res = text.match(searchRegExp)?.[0];
            if (res) {
              if (res.indexOf("theme:") > -1) {
                //原来就有主题配置
                //替换配置
                const newRes = res.replace(/theme:\s+(.*?)\n/, `theme: ${key}\n`);
                newText = newRes + text.replace(res, "");
              } else {
                //原来没有主题配置，但是有formatter
                const newRes = res.replace(
                  /---\n((.|\n)+---)/,
                  `---
                   theme: ${key}\n` + "$1",
                );
                newText = newRes + text.replace(res, "");
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
      const $style = document.createElement("style");
      try {
        $style.innerHTML = themes[((file as Record<string, any>)?.frontmatter as any)?.theme ?? ""]?.style ?? themes.jujin.style;
      } catch (e) {
        $style.innerHTML = themes.juejin.style;
      }
      document.querySelector(".markdown-body")?.appendChild($style);
      return () => {
        $style?.remove();
      };
    },
    actions: [
      {
        title: "Markdown主题",
        icon: icons.Theme,
        handler: {
          type: "dropdown",
          actions: actionItems,
        },
      },
    ],
  };
}
