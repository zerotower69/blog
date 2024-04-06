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
//# sourceMappingURL=utils.js.map