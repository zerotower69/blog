"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Res = void 0;
class Res {
    static Result(code, data, message) {
        return {
            code,
            data,
            message,
        };
    }
    static OK(message = 'ok', code = 200, data = null) {
        return Res.Result(code, data, message);
    }
    static OKWithPage(list, page = 1, total = 0, message = 'ok') {
        return Res.Result(200, Res.Page(list, page, total), message);
    }
    static OkWithList(list, message = 'ok') {
        return Res.Result(200, Res.List(list), message);
    }
    static Error(message = 'error', code = 400, data = null) {
        return Res.Result(code, data, message);
    }
    static ServerError(message = 'server error', code = 500, data = null) {
        return Res.Result(code, data, message);
    }
    static Page(list, page = 1, total = 0) {
        if (!total && list.length) {
            total = list.length;
        }
        return {
            list,
            page,
            total,
        };
    }
    static List(list) {
        const total = list.length;
        return {
            list,
            total,
        };
    }
}
exports.Res = Res;
//# sourceMappingURL=index.js.map