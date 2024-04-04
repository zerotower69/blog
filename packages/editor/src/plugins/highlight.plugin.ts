//自动高亮
import type { BytemdPlugin, BytemdAction } from "bytemd";
import { isObject } from "lodash-es";
import { icons } from "./icons";

export function autoHighlightPlugin(
  options: {
    //配置默认的CDN链接
    CDN?: string;
    //配置支持的highlight种类
    HIGHLIGHT?: string[];
  } = {},
): BytemdPlugin {
  options = {
    CDN: "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles",
    HIGHLIGHT: ["vs", "a11y-dark", "agate", "arta", "idea"],
    ...options,
  };
  const actionItems =
    options.HIGHLIGHT?.map((key) => {
      return {
        title: key,
        handler: {
          type: "action",
          click: ({ editor }) => {
            const text = editor.getValue();
            const searchRegExp = /^---(.|\n)*?---/;
            let newText = "";
            if (searchRegExp.test(text)) {
              //有 formatter
              const res = text.match(searchRegExp)?.[0];
              if (res) {
                if (res.indexOf("highlight:") > -1) {
                  //原来就有高亮配置
                  //替换配置
                  const newRes = res.replace(/highlight:\s+(.*?)\n/, `highlight: ${key}\n`);
                  newText = newRes + text.replace(res, "");
                } else {
                  //原来没有高亮配置，但是有formatter
                  const newRes = res.replace(/---\n((.|\n)*---)/, `---\nhighlight: ${key}\n` + "$1");
                  newText = newRes + text.replace(res, "");
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
      const $link = document.createElement("link");
      $link.rel = "stylesheet";
      const $header = document.getElementsByTagName("head")[0];
      try {
        const highlightName = ((file as Record<string, any>)?.frontmatter as Record<string, any>)?.highlight;
        if (!highlightName) {
          throw new Error("");
        }
        //拼接为完整的CDN地址
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
        title: "代码高亮样式",
        icon: icons.Highlight,
        handler: {
          type: "dropdown",
          actions: actionItems,
        },
      },
    ],
  };
}
