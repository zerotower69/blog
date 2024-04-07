import type { BytemdPlugin, BytemdViewerContext } from "bytemd";
import { visit } from "unist-util-visit";
import { v4 as uuidv4 } from "uuid";

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
  /**
   * will be using to fetch the info of web
   */
  loadInfoApi?: (url: string) => Promise<Partial<WebInfo>>;
  /**
   * define the value of the property [href] of a element,
   * default: blank
   */
  openMode: "self" | "blank";
  /**
   * when loadInfoApi timeout>= options.timeout, using default data
   * default: 30s
   */
  timeout?: number;
  /**
   * will be using then webinfo hasn't the icon property or loading icon occur error.
   * default: https://bpic.588ku.com/element_origin_min_pic/00/72/81/9356def45e71de5.jpg
   */
  defaultIcon?: String;

  /**
   * skeleton card root class, you can use it to change the styles of skeleton card.
   */
  skeletonWrapClass?: string;
  /**
   * data card root class, you can use it to change the styles of data card
   */
  dataWrapClass?: string;
}

const observerMap = new WeakSet<HTMLLinkElement>();

export default function cardLink(
  options: ByteMDPluginCardLinkOptions = {
    openMode: "blank",
  },
): BytemdPlugin {
  const {
    defaultIcon = "https://bpic.588ku.com/element_origin_min_pic/00/72/81/9356def45e71de5.jpg",
    openMode = "blank",
    skeletonWrapClass,
    dataWrapClass,
    loadInfoApi,
    timeout = 30 * 1000,
  } = options ?? {};
  function renderSkeletonCard(link: string) {
    const root = document.createElement("div");
    addClass(root, "zt-card-bookmark loading");
    if (skeletonWrapClass) {
      const getClass = skeletonWrapClass.split(" ").shift() as string;
      if (!hasClass(root, getClass)) {
        addClass(root, getClass);
      }
    }
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

  //render data card
  function renderDataCard(data: Partial<WebInfo>, defaultDesc?: string) {
    const root = document.createElement("div");
    const uid = uuidv4();
    if (!data.desc) {
      data.desc = defaultDesc ?? "";
    }
    addClass(root, "zt-card-bookmark");
    if (dataWrapClass) {
      const getClass = dataWrapClass.split(" ").shift() as string;
      if (!hasClass(root, getClass)) {
        addClass(root, getClass);
      }
    }
    root.innerHTML = `<a class="zt-card-bookmark-link" href="${data.url}" target="${options.openMode === "self" ? "_self" : "_blank"}">
    <div class="zt-card-bookmark-details">
      <div class="zt-card-bookmark-content">
      <img data-uid="${uid}" class="zt-card-bookmark-image" src="${data.icon}" alt="icon" />
      <div class="zt-card-bookmark-body">
      <div class="zt-card-bookmark-title">
      ${data?.title ?? data?.desc}
</div>
      <div class="zt-card-bookmark-desc">${data?.desc ?? data.url}</div>
      </div>
    </div>
   </div></a>`;
    setTimeout(() => {
      const imgEl = document.querySelector(`img[data-uid="${uid}"]`);
      if (imgEl) {
        (imgEl as HTMLImageElement).addEventListener("error", (e) => {
          iconLoadError(e);
        });
      }
    }, 0);
    return root;
  }

  //when image load error, using defaultIcon,
  // you must be sure the defaultIcon can be loaded successfully.
  function iconLoadError(e: Event) {
    const el = e.target as HTMLImageElement;
    el.setAttribute("src", defaultIcon as string);
    el.removeEventListener("error", iconLoadError);
  }
  //deal link to card
  function renderCard(aEl: HTMLLinkElement) {
    const url = aEl?.getAttribute("href") ?? "";
    //not validated link, do nothing
    if (!isHttpOrHttps(url)) return;
    //add link class
    if (!hasClass(aEl, LINK_CLASS)) {
      addClass(aEl, LINK_CLASS);
    }
    const defaultDesc = aEl?.textContent ?? url;
    const emptyCardRoot = renderSkeletonCard(url);
    aEl.replaceWith(emptyCardRoot);
    const defaultWebInfo: Partial<WebInfo> = {
      title: defaultDesc,
      url: url,
      icon: defaultIcon as string,
      desc: url,
    };
    const task = new Promise<Partial<WebInfo>>((resolve, reject) => {
      loadInfoApi?.(url).then(
        (data) => {
          resolve({
            ...defaultWebInfo,
            ...data,
          });
        },
        () => {
          resolve(defaultWebInfo);
        },
      );
      setTimeout(() => {
        resolve(defaultWebInfo);
      }, timeout);
    });
    task.then((data) => {
      emptyCardRoot.replaceWith(renderDataCard(data));
    });
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
      const eles = document.getElementsByClassName(TEMP_LINK_CLASS) as HTMLCollectionOf<HTMLLinkElement>;
      if (window.IntersectionObserver) {
        const intersectionObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio <= 0) return;
            renderCard(entry.target as HTMLLinkElement);
            //remove from observer
            intersectionObserver.unobserve(entry.target);
          });
        });
        Array.from(eles).forEach((ele) => {
          if (observerMap.has(ele)) return;
          intersectionObserver.observe(ele);
          observerMap.add(ele);
        });
        console.log(intersectionObserver.takeRecords());
      } else {
        Array.from(eles).forEach((ele) => {
          renderCard(ele);
        });
      }
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

export const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) return false;
  if (cls.includes(" ")) throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};

export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return;
  el.classList.add(...classNameToArray(cls));
};

export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return;
  el.classList.remove(...classNameToArray(cls));
};
