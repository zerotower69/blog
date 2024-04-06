import en from "../locales/en.json";
import yaml from "js-yaml";
var ICON_SVG = "<svg width=\"24\" height=\"24\" viewBox=\"0 0 48 48\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<rect width=\"48\" height=\"48\" fill=\"white\" fill-opacity=\"0.01\"></rect>\n<path d=\"M6 44L6 25H12V17H36V25H42V44H6Z\" fill=\"none\" stroke=\"#333\" stroke-width=\"4\" stroke-linejoin=\"round\"></path>\n<path d=\"M17 17V8L31 4V17\" stroke=\"#333\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path>\n</svg>";
export default function switchHighlight(options) {
    var _a, _b, _c, _d;
    if (options === void 0) { options = {}; }
    //默认参数构建
    var CDN = (_a = options === null || options === void 0 ? void 0 : options.cdn) !== null && _a !== void 0 ? _a : [];
    //兜底CDN
    CDN.push("https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles");
    var locale = ((_b = options === null || options === void 0 ? void 0 : options.locale) !== null && _b !== void 0 ? _b : en);
    var HIGHLIGHTS = (_c = options === null || options === void 0 ? void 0 : options.highlights) !== null && _c !== void 0 ? _c : ["vs", "one-light", "a11y-dark", "agate", "arta", "idea"];
    var HIGHLIGHT_KEY = "highlight";
    var icon = (_d = options === null || options === void 0 ? void 0 : options.icon) !== null && _d !== void 0 ? _d : ICON_SVG;
    //自动加载
    var $linkEl;
    var count = 0;
    var style = "vs";
    function loadStyle() {
        //TODO:已经加载的不要再加载了
        if (count + 1 > CDN.length || style === undefined) {
            return;
        }
        var $header = document.getElementsByTagName("head")[0];
        $linkEl = document.createElement("link");
        $linkEl.rel = "stylesheet";
        var baseLink = CDN[count];
        $linkEl.href = "".concat(baseLink).concat(baseLink.endsWith("/") ? "" : "/").concat(style, ".min.css");
        $header.appendChild($linkEl);
        $linkEl.onerror = function () {
            var _a, _b;
            //when load error, load left cdns.
            if (count + 1 > ((_b = (_a = options.cdn) === null || _a === void 0 ? void 0 : _a.length) !== null && _b !== void 0 ? _b : 0)) {
                return;
            }
            count++;
            $linkEl === null || $linkEl === void 0 ? void 0 : $linkEl.remove();
            $linkEl = document.createElement("link");
            $linkEl.rel = "stylesheet";
            var baseLink = CDN[count];
            $linkEl.href = "".concat(baseLink).concat(baseLink.endsWith("/") ? "" : "/").concat(style, ".min.css");
            $header.appendChild($linkEl);
        };
    }
    var actionItems = HIGHLIGHTS.map(function (key) {
        return {
            title: key,
            handler: {
                type: "action",
                click: function (_a) {
                    var _b;
                    var editor = _a.editor, codemirror = _a.codemirror, root = _a.root;
                    count = 0;
                    var text = editor.getValue();
                    var searchRegExp = /^---\n((.|\n)*?)---/;
                    var newText = "";
                    if (searchRegExp.test(text)) {
                        //formatter exit
                        var matchRes = (_b = text.match(searchRegExp)) === null || _b === void 0 ? void 0 : _b[1];
                        if (matchRes || matchRes === "") {
                            try {
                                var data = (yaml.load(matchRes) || {});
                                data[HIGHLIGHT_KEY] = key;
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
                        newText = "---\n".concat(HIGHLIGHT_KEY, ": ").concat(key, "\n---\n") + text;
                    }
                    editor.setValue(newText);
                },
            },
        };
    });
    return {
        viewerEffect: function (_a) {
            var _b;
            var file = _a.file;
            if (!isObject(file)) {
                return;
            }
            style = (_b = file === null || file === void 0 ? void 0 : file.frontmatter) === null || _b === void 0 ? void 0 : _b[HIGHLIGHT_KEY];
            loadStyle();
            return function () {
                $linkEl === null || $linkEl === void 0 ? void 0 : $linkEl.remove();
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
function isObject(val) {
    return typeof val === "object" && val !== null;
}
//# sourceMappingURL=index.js.map