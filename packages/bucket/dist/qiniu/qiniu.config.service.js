"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QiniuConfigService = void 0;
const common_1 = require("@nestjs/common");
const qiniu_constants_1 = require("./qiniu.constants");
let QiniuConfigService = class QiniuConfigService {
    constructor(qiniuOptions) {
        this.qiniuOptions = qiniuOptions;
        this.options = {};
        this.options = Object.assign(this.options, qiniuOptions);
    }
    get config() {
        return this.options;
    }
    set config(options) {
        this.options = Object.assign(this.options, options);
    }
};
exports.QiniuConfigService = QiniuConfigService;
exports.QiniuConfigService = QiniuConfigService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)(qiniu_constants_1.QINIU_MODULE_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], QiniuConfigService);
//# sourceMappingURL=qiniu.config.service.js.map