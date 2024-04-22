"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var COSModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.COSModule = void 0;
const common_1 = require("@nestjs/common");
const cos_constants_1 = require("./cos.constants");
const cos_service_1 = require("./cos.service");
let COSModule = COSModule_1 = class COSModule {
    static register(options) {
        return {
            global: options?.global ?? false,
            module: COSModule_1,
            providers: [
                {
                    provide: cos_constants_1.COS_OPTIONS,
                    useValue: options,
                },
            ],
        };
    }
};
exports.COSModule = COSModule;
exports.COSModule = COSModule = COSModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [cos_service_1.CosService],
        exports: [cos_service_1.CosService],
    })
], COSModule);
//# sourceMappingURL=cos.module.js.map