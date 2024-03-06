"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelloFilter = void 0;
const common_1 = require("@nestjs/common");
let HelloFilter = class HelloFilter {
    catch(exception, host) {
        const http = host.switchToHttp();
        const response = http.getResponse();
        const statusCode = exception.getStatus();
        const res = exception.getResponse();
        response.status(statusCode).json({
            code: statusCode,
            message: res?.message?.join ? res?.message?.join(',') : exception.message,
            error: 'Bad Request',
            data: null,
        });
    }
};
exports.HelloFilter = HelloFilter;
exports.HelloFilter = HelloFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HelloFilter);
//# sourceMappingURL=hello.filter.js.map