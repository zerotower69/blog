"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteKey = exports.getPageOffset = exports.md5 = void 0;
const crypto = require("crypto");
function md5(str) {
    const hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}
exports.md5 = md5;
function getPageOffset(page = 1, limit = 10) {
    return (page - 1) * limit;
}
exports.getPageOffset = getPageOffset;
function deleteKey(obj, ...keys) {
    if (typeof obj === 'object') {
        keys.forEach((key) => {
            if (Reflect.has(obj, key)) {
                Reflect.deleteProperty(obj, key);
            }
        });
    }
}
exports.deleteKey = deleteKey;
//# sourceMappingURL=index.js.map