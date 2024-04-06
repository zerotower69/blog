import en from "../locales/en.json";
import themes from "juejin-markdown-themes";
import yaml from "js-yaml";
export default function switchTheme(options) {
    var _a, _b, _c;
    if (options === void 0) { options = {}; }
    var THEME_KEY = (_a = options === null || options === void 0 ? void 0 : options.themeKey) !== null && _a !== void 0 ? _a : "theme";
    var locale = ((_b = options === null || options === void 0 ? void 0 : options.locale) !== null && _b !== void 0 ? _b : en);
    var ACTION_ICON = (_c = options === null || options === void 0 ? void 0 : options.icon) !== null && _c !== void 0 ? _c : "<svg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n      <path d=\"M6 2H2.66667C2.29848 2 2 2.29848 2 2.66667V6C2 6.36819 2.29848 6.66667 2.66667 6.66667H6C6.36819 6.66667 6.66667 6.36819 6.66667 6V2.66667C6.66667 2.29848 6.36819 2 6 2Z\" stroke=\"#1D2129\" stroke-width=\"1.33\" stroke-linejoin=\"round\"></path>\n      <path d=\"M6 9.3335H2.66667C2.29848 9.3335 2 9.63197 2 10.0002V13.3335C2 13.7017 2.29848 14.0002 2.66667 14.0002H6C6.36819 14.0002 6.66667 13.7017 6.66667 13.3335V10.0002C6.66667 9.63197 6.36819 9.3335 6 9.3335Z\" stroke=\"#1D2129\" stroke-width=\"1.33\" stroke-linejoin=\"round\"></path>\n      <path d=\"M13.3334 2H10C9.63185 2 9.33337 2.29848 9.33337 2.66667V6C9.33337 6.36819 9.63185 6.66667 10 6.66667H13.3334C13.7016 6.66667 14 6.36819 14 6V2.66667C14 2.29848 13.7016 2 13.3334 2Z\" stroke=\"#1D2129\" stroke-width=\"1.33\" stroke-linejoin=\"round\"></path>\n      <path d=\"M13.3334 9.3335H10C9.63185 9.3335 9.33337 9.63197 9.33337 10.0002V13.3335C9.33337 13.7017 9.63185 14.0002 10 14.0002H13.3334C13.7016 14.0002 14 13.7017 14 13.3335V10.0002C14 9.63197 13.7016 9.3335 13.3334 9.3335Z\" stroke=\"#1D2129\" stroke-width=\"1.33\" stroke-linejoin=\"round\"></path>\n      </svg>";
    var actionItems = Object.keys(themes).map(function (key) {
        return {
            title: key,
            handler: {
                type: "action",
                click: function (_a) {
                    var _b;
                    var editor = _a.editor;
                    var text = editor.getValue();
                    var searchRegExp = /^---\n((.|\n)*?)---/;
                    var newText = "";
                    if (searchRegExp.test(text)) {
                        //formatter exit
                        var matchRes = (_b = text.match(searchRegExp)) === null || _b === void 0 ? void 0 : _b[1];
                        if (matchRes || matchRes === "") {
                            try {
                                var data = (yaml.load(matchRes) || {});
                                data[THEME_KEY] = key;
                                newText = "---\n".concat(yaml.dump(data), "---");
                            }
                            catch (err) {
                                //
                            }
                        }
                        newText = newText + text.replace(searchRegExp, "");
                    }
                    //default
                    if (!newText) {
                        newText = "---\n".concat(THEME_KEY, ": ").concat(key, "\n---\n") + text;
                    }
                    editor.setValue(newText);
                },
            },
        };
    });
    return {
        //import juejin themes
        viewerEffect: function (_a) {
            var _b, _c, _d, _e, _f;
            var file = _a.file;
            if (!isObject(file)) {
                return;
            }
            var $style = document.createElement("style");
            try {
                $style.innerHTML = (_e = (_d = themes[(_c = (_b = file === null || file === void 0 ? void 0 : file.frontmatter) === null || _b === void 0 ? void 0 : _b.theme) !== null && _c !== void 0 ? _c : ""]) === null || _d === void 0 ? void 0 : _d.style) !== null && _e !== void 0 ? _e : themes.jujin.style;
            }
            catch (e) {
                $style.innerHTML = themes.juejin.style;
            }
            (_f = document.querySelector(".markdown-body")) === null || _f === void 0 ? void 0 : _f.appendChild($style);
            return function () {
                $style === null || $style === void 0 ? void 0 : $style.remove();
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
function isObject(val) {
    return typeof val === "object" && val !== null;
}
//# sourceMappingURL=index.js.map