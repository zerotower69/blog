"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var QiniuModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.QiniuModule = void 0;
const common_1 = require("@nestjs/common");
const qiniu_service_1 = require("./qiniu.service");
const qiniu_constants_1 = require("./qiniu.constants");
const qiniu_config_service_1 = require("./qiniu.config.service");
let QiniuModule = QiniuModule_1 = class QiniuModule {
    static register(options) {
        return {
            global: options?.global ?? false,
            module: QiniuModule_1,
            providers: [
                {
                    provide: qiniu_constants_1.QINIU_MODULE_OPTIONS,
                    useValue: options,
                },
                {
                    provide: qiniu_constants_1.QINIU_CONFIG_SERVICE,
                    useClass: qiniu_config_service_1.QiniuConfigService,
                },
            ],
        };
    }
};
exports.QiniuModule = QiniuModule;
exports.QiniuModule = QiniuModule = QiniuModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [],
        providers: [qiniu_service_1.QiniuService],
        exports: [qiniu_service_1.QiniuService],
    })
], QiniuModule);
//# sourceMappingURL=qiniu.module.js.map