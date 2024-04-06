import type { BytemdPlugin, BytemdViewerContext } from "bytemd";
import { visit } from "unist-util-visit";
import { addClass, hasClass, removeClass } from "./utils";

export type Locale = {};

export type ExcludeItem = string | RegExp;

const TEMP_LINK_CLASS = "link-temp-to-be-card";
const LINK_CLASS = "zt-bookmark-link";
export interface WebInfo {
  title: string;
  desc: string;
  icon: string;
  baseUrl: string;
  host: string;
  url: string;
}

export interface ByteMDPluginCardLinkOptions {
  /**
   * switch languages as you like.
   */
  locale?: Locale;
  /**
   * indicate links which don't need to transform.
   */
  exclude?: ExcludeItem | ExcludeItem[];
  loadInfoApi?: (url: string) => Promise<Partial<WebInfo>>;
  openMode: "self" | "blank";
}

export default function cardLink(
  options: ByteMDPluginCardLinkOptions = {
    openMode: "blank",
  },
): BytemdPlugin {
  async function fetchWebInfo(link: string) {
    const res = await fetch(link).then((res) => res.text);
    console.log(res);
    return res;
  }
  function getEmptyBox(link: string) {
    const root = document.createElement("div");
    addClass(root, "zt-card-bookmark loading");
    root.innerHTML = `<a class="zt-card-bookmark-link" href="${link}" target="${options.openMode === "self" ? "_self" : "_blank"}">
    <div class="zt-card-bookmark-details">
      <div class="zt-card-bookmark-content">
      <div class="zt-card-bookmark-image"></div>
      <div class="zt-card-bookmark-body">
      <div class="zt-card-bookmark-title"></div>
      <div class="zt-card-bookmark-desc"></div>
      </div>
    </div>
   </div></a>`;
    return root;
  }
  function getDataBox(data: WebInfo, defaultDesc?: string) {
    const root = document.createElement("div");
    if (!data.desc) {
      data.desc = defaultDesc ?? "";
    }
    addClass(root, "zt-card-bookmark");
    root.innerHTML = `<a class="zt-card-bookmark-link" href="${data.url}" target="${options.openMode === "self" ? "_self" : "_blank"}">
    <div class="zt-card-bookmark-details">
      <div class="zt-card-bookmark-content">
      <img class="zt-card-bookmark-image" src="${data.icon}" alt="icon"/>
      <div class="zt-card-bookmark-body">
      <div class="zt-card-bookmark-title">
      ${data.title}
</div>
      <div class="zt-card-bookmark-desc">${data.desc}</div>
      </div>
    </div>
   </div></a>`;
    return root;
  }
  return {
    remark: (p) => {
      p.use(() => (tree, vFile) => {
        visit(tree, "link", (node: Record<string, any>, index, parent) => {
          //match to exclude option, or doesn't be http(s) link, don't need to transform.
          if ((options.exclude && isExclude(options.exclude, node.url)) || !isHttpOrHttps(node.url)) {
            return;
          }
          const url = node.url as string;
          let defaultText = "";
          if ((node.children?.[0]?.type ?? "") === "text") {
            defaultText = node.children[0]?.value ?? "";
          }
          const children: Record<string, any>[] = [
            {
              type: "text",
              value: defaultText,
            },
            {
              type: "element",
              tagName: "a",
              properties: {
                className: TEMP_LINK_CLASS,
                href: url,
              },
              children: [
                {
                  type: "text",
                  value: defaultText,
                },
              ],
            },
          ];
          if (!node.data) node.data = {};
          node.data.hName = "span";
          node.data.hChildren = children;
        });
        return tree;
      });
      return p;
    },
    viewerEffect({ markdownBody }): void | (() => void) {
      const eles = document.getElementsByClassName(TEMP_LINK_CLASS);
      Array.from(eles).forEach((ele) => {
        const defaultDesc = ele.textContent;
        removeClass(ele, TEMP_LINK_CLASS);
        if (!hasClass(ele, LINK_CLASS)) {
          addClass(ele, LINK_CLASS);
        }
        const url = ele?.getAttribute("href") ?? "";
        const emptyRoot = getEmptyBox(url);
        ele.replaceWith(emptyRoot);
        options?.loadInfoApi?.(url)?.then((data) => {
          emptyRoot.replaceWith(getDataBox(data, defaultDesc));
        });
      });
    },
  };
}

function isExclude(exclude: ExcludeItem | ExcludeItem[], link: string): boolean {
  if (Array.isArray(exclude)) {
    return exclude.some((item) => isExclude(item, link));
  } else {
    return isRegExp(exclude) ? regexpCheck(exclude as RegExp, link) : stringCheck(exclude as string, link);
  }

  function regexpCheck(reg: RegExp, link: string) {
    return reg.test(link);
  }
  function stringCheck(excludeStr: string, link: string) {
    return excludeStr === link;
  }
}

function isRegExp(val: any) {
  const res = Object.prototype.toString.call(val);
  return res.substring(8, res.length - 1) === "RegExp";
}

function isHttpOrHttps(link: string) {
  return /^http(s)*/.test(link);
}
