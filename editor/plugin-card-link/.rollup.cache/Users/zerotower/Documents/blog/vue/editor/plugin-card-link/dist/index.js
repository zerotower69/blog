import { __assign } from "tslib";
import { visit } from "unist-util-visit";
import { v4 as uuidv4 } from "uuid";
var TEMP_LINK_CLASS = "link-temp-to-be-card";
var LINK_CLASS = "zt-bookmark-link";
var observerMap = new WeakSet();
export default function cardLink(options) {
    if (options === void 0) { options = {
        openMode: "blank",
    }; }
    var _a = options !== null && options !== void 0 ? options : {}, _b = _a.defaultIcon, defaultIcon = _b === void 0 ? "https://bpic.588ku.com/element_origin_min_pic/00/72/81/9356def45e71de5.jpg" : _b, _c = _a.openMode, openMode = _c === void 0 ? "blank" : _c, skeletonWrapClass = _a.skeletonWrapClass, dataWrapClass = _a.dataWrapClass, loadInfoApi = _a.loadInfoApi, _d = _a.timeout, timeout = _d === void 0 ? 30 * 1000 : _d;
    function renderSkeletonCard(link) {
        var root = document.createElement("div");
        addClass(root, "zt-card-bookmark loading");
        if (skeletonWrapClass) {
            var getClass = skeletonWrapClass.split(" ").shift();
            if (!hasClass(root, getClass)) {
                addClass(root, getClass);
            }
        }
        root.innerHTML = "<a class=\"zt-card-bookmark-link\" href=\"".concat(link, "\" target=\"").concat(options.openMode === "self" ? "_self" : "_blank", "\">\n    <div class=\"zt-card-bookmark-details\">\n      <div class=\"zt-card-bookmark-content\">\n      <div class=\"zt-card-bookmark-image\"></div>\n      <div class=\"zt-card-bookmark-body\">\n      <div class=\"zt-card-bookmark-title\"></div>\n      <div class=\"zt-card-bookmark-desc\"></div>\n      </div>\n    </div>\n   </div></a>");
        return root;
    }
    //render data card
    function renderDataCard(data, defaultDesc) {
        var _a, _b;
        var root = document.createElement("div");
        var uid = uuidv4();
        if (!data.desc) {
            data.desc = defaultDesc !== null && defaultDesc !== void 0 ? defaultDesc : "";
        }
        addClass(root, "zt-card-bookmark");
        if (dataWrapClass) {
            var getClass = dataWrapClass.split(" ").shift();
            if (!hasClass(root, getClass)) {
                addClass(root, getClass);
            }
        }
        root.innerHTML = "<a class=\"zt-card-bookmark-link\" href=\"".concat(data.url, "\" target=\"").concat(options.openMode === "self" ? "_self" : "_blank", "\">\n    <div class=\"zt-card-bookmark-details\">\n      <div class=\"zt-card-bookmark-content\">\n      <img data-uid=\"").concat(uid, "\" class=\"zt-card-bookmark-image\" src=\"").concat(data.icon, "\" alt=\"icon\" />\n      <div class=\"zt-card-bookmark-body\">\n      <div class=\"zt-card-bookmark-title\">\n      ").concat((_a = data === null || data === void 0 ? void 0 : data.title) !== null && _a !== void 0 ? _a : data === null || data === void 0 ? void 0 : data.desc, "\n</div>\n      <div class=\"zt-card-bookmark-desc\">").concat((_b = data === null || data === void 0 ? void 0 : data.desc) !== null && _b !== void 0 ? _b : data.url, "</div>\n      </div>\n    </div>\n   </div></a>");
        setTimeout(function () {
            var imgEl = document.querySelector("img[data-uid=\"".concat(uid, "\"]"));
            if (imgEl) {
                imgEl.addEventListener("error", function (e) {
                    iconLoadError(e);
                });
            }
        }, 0);
        return root;
    }
    //when image load error, using defaultIcon,
    // you must be sure the defaultIcon can be loaded successfully.
    function iconLoadError(e) {
        var el = e.target;
        el.setAttribute("src", defaultIcon);
        el.removeEventListener("error", iconLoadError);
    }
    //deal link to card
    function renderCard(aEl) {
        var _a, _b;
        var url = (_a = aEl === null || aEl === void 0 ? void 0 : aEl.getAttribute("href")) !== null && _a !== void 0 ? _a : "";
        //not validated link, do nothing
        if (!isHttpOrHttps(url))
            return;
        //add link class
        if (!hasClass(aEl, LINK_CLASS)) {
            addClass(aEl, LINK_CLASS);
        }
        var defaultDesc = (_b = aEl === null || aEl === void 0 ? void 0 : aEl.textContent) !== null && _b !== void 0 ? _b : url;
        var emptyCardRoot = renderSkeletonCard(url);
        aEl.replaceWith(emptyCardRoot);
        var defaultWebInfo = {
            title: defaultDesc,
            url: url,
            icon: defaultIcon,
            desc: url,
        };
        var task = new Promise(function (resolve, reject) {
            loadInfoApi === null || loadInfoApi === void 0 ? void 0 : loadInfoApi(url).then(function (data) {
                resolve(__assign(__assign({}, defaultWebInfo), data));
            }, function () {
                resolve(defaultWebInfo);
            });
            setTimeout(function () {
                resolve(defaultWebInfo);
            }, timeout);
        });
        task.then(function (data) {
            emptyCardRoot.replaceWith(renderDataCard(data));
        });
    }
    return {
        remark: function (p) {
            p.use(function () { return function (tree, vFile) {
                visit(tree, "link", function (node, index, parent) {
                    var _a, _b, _c, _d, _e;
                    //match to exclude option, or doesn't be http(s) link, don't need to transform.
                    if ((options.exclude && isExclude(options.exclude, node.url)) || !isHttpOrHttps(node.url)) {
                        return;
                    }
                    var url = node.url;
                    var defaultText = "";
                    if (((_c = (_b = (_a = node.children) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : "") === "text") {
                        defaultText = (_e = (_d = node.children[0]) === null || _d === void 0 ? void 0 : _d.value) !== null && _e !== void 0 ? _e : "";
                    }
                    var children = [
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
                    if (!node.data)
                        node.data = {};
                    node.data.hName = "span";
                    node.data.hChildren = children;
                });
                return tree;
            }; });
            return p;
        },
        viewerEffect: function (_a) {
            var markdownBody = _a.markdownBody;
            var eles = document.getElementsByClassName(TEMP_LINK_CLASS);
            if (window.IntersectionObserver) {
                var intersectionObserver_1 = new IntersectionObserver(function (entries, observer) {
                    entries.forEach(function (entry) {
                        if (entry.intersectionRatio <= 0)
                            return;
                        renderCard(entry.target);
                        //remove from observer
                        intersectionObserver_1.unobserve(entry.target);
                    });
                });
                Array.from(eles).forEach(function (ele) {
                    if (observerMap.has(ele))
                        return;
                    intersectionObserver_1.observe(ele);
                    observerMap.add(ele);
                });
                console.log(intersectionObserver_1.takeRecords());
            }
            else {
                Array.from(eles).forEach(function (ele) {
                    renderCard(ele);
                });
            }
        },
    };
}
function isExclude(exclude, link) {
    if (Array.isArray(exclude)) {
        return exclude.some(function (item) { return isExclude(item, link); });
    }
    else {
        return isRegExp(exclude) ? regexpCheck(exclude, link) : stringCheck(exclude, link);
    }
    function regexpCheck(reg, link) {
        return reg.test(link);
    }
    function stringCheck(excludeStr, link) {
        return excludeStr === link;
    }
}
function isRegExp(val) {
    var res = Object.prototype.toString.call(val);
    return res.substring(8, res.length - 1) === "RegExp";
}
function isHttpOrHttps(link) {
    return /^http(s)*/.test(link);
}
export var classNameToArray = function (cls) {
    if (cls === void 0) { cls = ""; }
    return cls.split(" ").filter(function (item) { return !!item.trim(); });
};
export var hasClass = function (el, cls) {
    if (!el || !cls)
        return false;
    if (cls.includes(" "))
        throw new Error("className should not contain space.");
    return el.classList.contains(cls);
};
export var addClass = function (el, cls) {
    var _a;
    if (!el || !cls.trim())
        return;
    (_a = el.classList).add.apply(_a, classNameToArray(cls));
};
export var removeClass = function (el, cls) {
    var _a;
    if (!el || !cls.trim())
        return;
    (_a = el.classList).remove.apply(_a, classNameToArray(cls));
};
//# sourceMappingURL=index.js.map