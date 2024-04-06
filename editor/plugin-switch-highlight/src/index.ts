import type { BytemdAction, BytemdPlugin } from "bytemd";
import en from "../locales/en.json";
import yaml from "js-yaml";

const ICON_SVG = `<svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="48" height="48" fill="white" fill-opacity="0.01"></rect>
<path d="M6 44L6 25H12V17H36V25H42V44H6Z" fill="none" stroke="#333" stroke-width="4" stroke-linejoin="round"></path>
<path d="M17 17V8L31 4V17" stroke="#333" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path>
</svg>`;

type Locale = {
  title: string;
};

export interface BytemdPluginSwitchHighlightOptions {
  /**
   * using inline svg
   */
  icon?: string;
  /**
   * highlight key in your formatter, default: theme
   */
  highlightKey?: string;
  /**
   * you can use different languages for as you like!
   */
  locale?: string;
  /**
   * using cdn highlight styles:
   * jsdeliver
   */
  cdn?: string[];
  highlights?: string[];
}
export default function switchHighlight(options: BytemdPluginSwitchHighlightOptions = {}): BytemdPlugin {
  //默认参数构建
  const CDN = options?.cdn ?? [];
  //兜底CDN
  CDN.push("https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles");
  const locale = (options?.locale ?? en) as Locale;
  const HIGHLIGHTS = options?.highlights ?? ["vs", "one-light", "a11y-dark", "agate", "arta", "idea"];
  const HIGHLIGHT_KEY = "highlight";
  const icon = options?.icon ?? ICON_SVG;

  //自动加载
  let $linkEl: HTMLLinkElement;
  let count = 0;
  let style = "vs";
  function loadStyle() {
    //TODO:已经加载的不要再加载了
    if (count + 1 > CDN.length || style === undefined) {
      return;
    }
    const $header = document.getElementsByTagName("head")[0];
    $linkEl = document.createElement("link");
    $linkEl.rel = "stylesheet";
    const baseLink = CDN[count];
    $linkEl.href = `${baseLink}${baseLink.endsWith("/") ? "" : "/"}${style}.min.css`;
    $header.appendChild($linkEl);
    $linkEl.onerror = function () {
      //when load error, load left cdns.
      if (count + 1 > (options.cdn?.length ?? 0)) {
        return;
      }
      count++;
      $linkEl?.remove();
      $linkEl = document.createElement("link");
      $linkEl.rel = "stylesheet";
      const baseLink = CDN[count];
      $linkEl.href = `${baseLink}${baseLink.endsWith("/") ? "" : "/"}${style}.min.css`;
      $header.appendChild($linkEl);
    };
  }

  const actionItems = HIGHLIGHTS.map((key) => {
    return {
      title: key,
      handler: {
        type: "action",
        click: ({ editor, codemirror, root }) => {
          count = 0;
          const text = editor.getValue();
          const searchRegExp = /^---\n((.|\n)*?)---/;
          let newText = "";
          if (searchRegExp.test(text)) {
            //formatter exit
            const matchRes = text.match(searchRegExp)?.[1];
            if (matchRes || matchRes === "") {
              try {
                let data = (yaml.load(matchRes) || {}) as Record<string, any>;
                data[HIGHLIGHT_KEY] = key;
                newText = `---\n${yaml.dump(data)}---`;
              } catch (err) {
                //
              }
            }
            newText = newText + text.replace(searchRegExp, "");
          }
          //default
          if (!newText) {
            newText = `---\n${HIGHLIGHT_KEY}: ${key}\n---\n` + text;
          }
          editor.setValue(newText);
        },
      },
    } as BytemdAction;
  });
  return {
    viewerEffect({ file }) {
      if (!isObject(file)) {
        return;
      }
      style = ((file as Record<string, any>)?.frontmatter as Record<string, any>)?.[HIGHLIGHT_KEY];
      loadStyle();
      return () => {
        $linkEl?.remove();
      };
    },
    actions: [
      {
        title: locale.title,
        icon: icon,
        handler: {
          type: "dropdown",
          actions: actionItems,
        },
      },
    ],
  };
}

function isObject(val: any) {
  return typeof val === "object" && val !== null;
}
