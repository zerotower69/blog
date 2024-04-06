import ClipBoard from "clipboard";
import { visit } from "unist-util-visit";
import { addClass, hasClass, removeClass } from "./utils";
//fold class
var HEADER_CLASS = "code-block-extension-header";
var FOLD_CLASS = "code-block-extension-fold";
var FOLD_BTN_CLASS = "code-block-extension-foldBtn";
var COPY_CLASS = "code-block-extension-copyBtn";
var LANG_CLASS = "code-block-extension-lang";
var META_CLASS = "code-block-extension-meta";
export default function copyCode(options) {
    var _a;
    if (options === void 0) { options = {}; }
    var COPY_TEXT = (_a = options === null || options === void 0 ? void 0 : options.copyText) !== null && _a !== void 0 ? _a : "复制代码";
    //click fold button callback
    function clickFoldBtn(e) {
        var _a, _b, _c;
        var $el = e.target;
        while (!hasClass($el, FOLD_BTN_CLASS)) {
            $el = $el.parentElement;
        }
        var $codeEl = (_c = (_b = (_a = $el.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.lastElementChild;
        if (hasClass($el, FOLD_CLASS)) {
            removeClass($el, FOLD_CLASS);
            if ($codeEl) {
                removeClass($codeEl, FOLD_CLASS);
            }
        }
        else {
            addClass($el, FOLD_CLASS);
            if ($codeEl) {
                addClass($codeEl, FOLD_CLASS);
            }
        }
    }
    //click copy button callback
    function clickCopyBtn(e) {
        var _a, _b, _c, _d;
        var $el = e.target;
        while (!hasClass($el, COPY_CLASS)) {
            $el = $el.parentElement;
        }
        try {
            var $codeEl = (_c = (_b = (_a = $el === null || $el === void 0 ? void 0 : $el.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.lastElementChild;
            var codeText_1 = "";
            $codeEl.childNodes.forEach(function (node) {
                codeText_1 += node.textContent;
            });
            if (options === null || options === void 0 ? void 0 : options.copyRight) {
                codeText_1 += options.copyRight;
            }
            var cboard = new ClipBoard($el, {
                text: function () {
                    return codeText_1;
                },
            });
            cboard
                .on("success", function (e) {
                var _a;
                (_a = options === null || options === void 0 ? void 0 : options.copySuccess) === null || _a === void 0 ? void 0 : _a.call(null, e.text);
            })
                .on("error", function (e) {
                var _a;
                //
                (_a = options === null || options === void 0 ? void 0 : options.copyError) === null || _a === void 0 ? void 0 : _a.call(null, new Error("copy failed"));
            });
            $el.click();
            cboard.destroy();
        }
        catch (err) {
            (_d = options === null || options === void 0 ? void 0 : options.copyError) === null || _d === void 0 ? void 0 : _d.call(null, err);
        }
    }
    return {
        remark: function (p) {
            p.use(function () { return function (tree, vFile) {
                var transformations = [];
                visit(tree, "code", function (node) {
                    var _a;
                    var _b, _c;
                    // get code child html
                    var codeChildren = (node.data && node.data.hChildren) || [
                        {
                            type: "text",
                            value: node.value,
                        },
                    ];
                    var codeProperties = (node.data && node.data.hProperties) ||
                        (node.lang
                            ? {
                                className: ["language-" + node.lang],
                            }
                            : {});
                    // apply transformation
                    var n = node;
                    n.type = "code-extra";
                    if (!n.data)
                        n.data = {};
                    // @ts-ignore
                    var children = [
                        {
                            type: "element",
                            tagName: "pre",
                            children: [
                                {
                                    type: "element",
                                    tagName: "div",
                                    properties: {
                                        className: HEADER_CLASS,
                                    },
                                    children: [
                                        //left
                                        {
                                            type: "element",
                                            tagName: "div",
                                            properties: {
                                                className: "code-block-extension-headerLeft",
                                            },
                                            children: [
                                                {
                                                    type: "element",
                                                    tagName: "div",
                                                    properties: {
                                                        className: FOLD_BTN_CLASS,
                                                    },
                                                },
                                                {
                                                    type: "element",
                                                    tagName: "span",
                                                    properties: {
                                                        className: META_CLASS,
                                                    },
                                                    children: [{ type: "text", value: (_b = node === null || node === void 0 ? void 0 : node.meta) !== null && _b !== void 0 ? _b : "" }],
                                                },
                                            ],
                                        },
                                        //right
                                        {
                                            type: "element",
                                            tagName: "div",
                                            properties: {
                                                className: "code-block-extension-headerRight",
                                            },
                                            children: [
                                                {
                                                    type: "element",
                                                    tagName: "span",
                                                    properties: {
                                                        className: LANG_CLASS,
                                                    },
                                                    children: [
                                                        {
                                                            type: "text",
                                                            value: (_c = node === null || node === void 0 ? void 0 : node.lang) !== null && _c !== void 0 ? _c : "",
                                                        },
                                                    ],
                                                },
                                                {
                                                    type: "element",
                                                    tagName: "span",
                                                    properties: (_a = {
                                                            className: COPY_CLASS
                                                        },
                                                        _a["data-clipboard-text"] = node.value,
                                                        _a),
                                                    value: node.value,
                                                    children: [{ type: "text", value: COPY_TEXT }],
                                                },
                                            ],
                                        },
                                    ],
                                },
                                {
                                    type: "element",
                                    tagName: "code",
                                    properties: codeProperties,
                                    children: codeChildren,
                                },
                            ],
                        },
                    ];
                    n.data.hName = "div";
                    n.data.hProperties = {
                        className: ["bytemd-code-block"],
                    };
                    n.data.hChildren = children;
                });
                return tree;
            }; });
            return p;
        },
        viewerEffect: function (_a) {
            var markdownBody = _a.markdownBody;
            var eles = markdownBody.getElementsByClassName(FOLD_BTN_CLASS);
            Array.from(eles).forEach(function (ele) {
                ele.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\"><path d=\"M16.924 9.617A1 1 0 0 0 16 9H8a1 1 0 0 0-.707 1.707l4 4a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0 .217-1.09z\" data-name=\"Down\"></path></svg>";
                ele.removeEventListener("click", clickFoldBtn);
                ele.addEventListener("click", clickFoldBtn);
            });
            var copyEles = markdownBody.getElementsByClassName(COPY_CLASS);
            Array.from(copyEles).forEach(function (ele) {
                ele.removeEventListener("click", clickCopyBtn);
                ele.addEventListener("click", clickCopyBtn);
            });
        },
    };
}
//# sourceMappingURL=index.js.map