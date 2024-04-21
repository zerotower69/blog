import type { BytemdAction, BytemdPlugin } from "bytemd";
import en from "../locales/en.json";
import themes from "juejin-markdown-themes";
import yaml from "js-yaml";

export type Locale = {
  title: string;
};

export interface BytemdPluginSwitchThemeOptions {
  /**
   * using inline svg
   */
  icon?: string;
  /**
   * theme key in your formatter, default: theme
   */
  themeKey?: string;
  /**
   * switch language as you like.
   */
  locale?: Locale;
}
export default function switchTheme(options: BytemdPluginSwitchThemeOptions = {}): BytemdPlugin {
  const THEME_KEY = options?.themeKey ?? "theme";
  const locale = (options?.locale ?? en) as Locale;
  const ACTION_ICON =
    options?.icon ??
    `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 2H2.66667C2.29848 2 2 2.29848 2 2.66667V6C2 6.36819 2.29848 6.66667 2.66667 6.66667H6C6.36819 6.66667 6.66667 6.36819 6.66667 6V2.66667C6.66667 2.29848 6.36819 2 6 2Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
      <path d="M6 9.3335H2.66667C2.29848 9.3335 2 9.63197 2 10.0002V13.3335C2 13.7017 2.29848 14.0002 2.66667 14.0002H6C6.36819 14.0002 6.66667 13.7017 6.66667 13.3335V10.0002C6.66667 9.63197 6.36819 9.3335 6 9.3335Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
      <path d="M13.3334 2H10C9.63185 2 9.33337 2.29848 9.33337 2.66667V6C9.33337 6.36819 9.63185 6.66667 10 6.66667H13.3334C13.7016 6.66667 14 6.36819 14 6V2.66667C14 2.29848 13.7016 2 13.3334 2Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
      <path d="M13.3334 9.3335H10C9.63185 9.3335 9.33337 9.63197 9.33337 10.0002V13.3335C9.33337 13.7017 9.63185 14.0002 10 14.0002H13.3334C13.7016 14.0002 14 13.7017 14 13.3335V10.0002C14 9.63197 13.7016 9.3335 13.3334 9.3335Z" stroke="#1D2129" stroke-width="1.33" stroke-linejoin="round"></path>
      </svg>`;

  const actionItems: BytemdAction[] = Object.keys(themes).map((key) => {
    return {
      title: key,
      handler: {
        type: "action",
        click: ({ editor }) => {
          const text = editor.getValue();
          const searchRegExp = /^---\n((.|\n)*?)---/;
          let newText = "";
          if (searchRegExp.test(text)) {
            //formatter exit
            const matchRes = text.match(searchRegExp)?.[1];
            if (matchRes || matchRes === "") {
              try {
                let data = (yaml.load(matchRes) || {}) as Record<string, any>;
                data[THEME_KEY] = key;
                newText = `---\n${yaml.dump(data)}---`;
              } catch (err) {
                //
              }
            }
            newText = newText + text.replace(searchRegExp, "");
          }
          //default
          if (!newText) {
            newText = `---\n${THEME_KEY}: ${key}\n---\n` + text;
          }
          editor.setValue(newText);
        },
      },
    } as BytemdAction;
  });

  return {
    //import juejin themes
    viewerEffect({ file }: any) {
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
        title: locale.title,
        icon: ACTION_ICON,
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
