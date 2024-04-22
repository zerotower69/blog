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
exports.QiniuService = void 0;
const common_1 = require("@nestjs/common");
const qiniu_config_service_1 = require("./qiniu.config.service");
const qiniu_constants_1 = require("./qiniu.constants");
const qiniu = require("qiniu");
let QiniuService = class QiniuService {
    constructor(configService) {
        this.configService = configService;
    }
    getMac(macOptions) {
        const options = this.configService.config;
        if (!Reflect.has(options, 'access_key')) {
            throw new common_1.InternalServerErrorException('access_key not exit');
        }
        if (!Reflect.has(options, 'secret_key')) {
            throw new common_1.InternalServerErrorException('secret_key not exit');
        }
        return new qiniu.auth.digest.Mac(options.access_key, options.secret_key, {
            ...(options.mac ?? {}),
        });
    }
    getUploadToken(policyOptions, macOptions) {
        const scope = this.configService.config.scope;
        const putPolicy = new qiniu.rs.PutPolicy({
            ...(policyOptions ?? {}),
            scope: scope,
        });
        const mac = this.getMac(macOptions);
        return putPolicy.uploadToken(mac);
    }
    getZone() {
        const options = this.configService.config;
        const key = options.zone;
        return qiniu.zone[key];
    }
    getConfConfig(options) {
        options = {
            ...options,
        };
        const zone = this.getZone();
        const confConfig = new qiniu.conf.Config({
            ...options,
            zone: zone,
        });
        return confConfig;
    }
    uploadLocalFile(localPath, filename = null) {
        return new Promise((resolve, reject) => {
            const config = this.getConfConfig();
            const formUploader = new qiniu.form_up.FormUploader(config);
            const putExtra = new qiniu.form_up.PutExtra();
            const uploadToken = this.getUploadToken();
            formUploader.putFile(uploadToken, filename, localPath, putExtra, function (respErr, respBody, respInfo) {
                if (respErr) {
                    reject(respErr);
                }
                else {
                    resolve({
                        body: respBody,
                        info: respInfo,
                    });
                }
            });
        });
    }
    uploadData(data, filename) {
        return new Promise((resolve, reject) => {
            const config = this.getConfConfig();
            const formUploader = new qiniu.form_up.FormUploader(config);
            const putExtra = new qiniu.form_up.PutExtra();
            const uploadToken = this.getUploadToken();
            formUploader.put(uploadToken, filename, data, putExtra, function (respErr, respBody, respInfo) {
                if (respErr) {
                    reject(respErr);
                }
                else {
                    resolve({
                        body: respBody,
                        info: respInfo,
                    });
                }
            });
        });
    }
    uploadStream(rs, filename) {
        return new Promise((resolve, reject) => {
            const config = this.getConfConfig();
            const formUploader = new qiniu.form_up.FormUploader(config);
            const putExtra = new qiniu.form_up.PutExtra();
            const uploadToken = this.getUploadToken();
            formUploader.putStream(uploadToken, filename, rs, putExtra, function (respError, respBody, respInfo) {
                if (respError) {
                    reject(respError);
                }
                else {
                    resolve({
                        body: respBody,
                        info: respInfo,
                    });
                }
            });
        });
    }
};
exports.QiniuService = QiniuService;
exports.QiniuService = QiniuService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(qiniu_constants_1.QINIU_CONFIG_SERVICE)),
    __metadata("design:paramtypes", [qiniu_config_service_1.QiniuConfigService])
], QiniuService);
//# sourceMappingURL=qiniu.service.js.map