import { icons } from "./icons";
import en from "../locales/en.json";
import themes from "juejin-markdown-themes";
import yaml from "js-yaml";
export default function switchTheme(options = {}) {
    const THEME_KEY = options?.themeKey ?? "theme";
    const locale = (options?.locale ?? en);
    const ACTION_ICON = options?.icon ?? icons.Theme;
    const actionItems = Object.keys(themes).map((key) => {
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
                                let data = (yaml.load(matchRes) || {});
                                data[THEME_KEY] = key;
                                newText = `---\n${yaml.dump(data)}---`;
                            }
                            catch (err) {
                                //
                            }
                        }
                        newText = newText + text.replace(searchRegExp, "");
                    }
                    //default
                    if (!newText) {
                        newText = `---\ntheme: ${key}\n---\n` + text;
                    }
                    editor.setValue(newText);
                },
            },
        };
    });
    return {
        //import juejin themes
        viewerEffect({ file }) {
            if (!isObject(file)) {
                return;
            }
            const $style = document.createElement("style");
            try {
                $style.innerHTML = themes[file?.frontmatter?.theme ?? ""]?.style ?? themes.jujin.style;
            }
            catch (e) {
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
                icon: icons.Theme,
                handler: {
                    type: "dropdown",
                    actions: actionItems,
                },
            },
        ],
    };
}
function isObject(val) {
    return typeof val === "object" && val !== null;
}
//# sourceMappingURL=index.js.map