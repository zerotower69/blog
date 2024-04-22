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
exports.CosService = void 0;
const COS = require("cos-nodejs-sdk-v5");
const common_1 = require("@nestjs/common");
const cos_constants_1 = require("./cos.constants");
let CosService = class CosService {
    constructor(cosOptions) {
        this.cosOptions = cosOptions;
        this.options = {};
        this.options = Object.assign(this.options, cosOptions);
    }
    getInstance(options = {}) {
        return new COS(options);
    }
    async uploadFile(filepath, filename, key) {
        try {
            const instance = this.getInstance({
                SecretId: this.options.secret_id,
                SecretKey: this.options.secret_key,
            });
            if (key) {
                key = key + '/' + filename;
            }
            else {
                key = filename;
            }
            const options = {
                FilePath: filepath,
                Bucket: this.options.bucket,
                Region: this.options.region,
                Key: key,
            };
            const result = await instance.uploadFile(options);
            if (result.statusCode === 200) {
                const location = result.Location;
                const paths = location.split('/');
                paths[0] = 'https://' + this.options.url;
                result.Location = paths.join('/');
            }
            return result;
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    async deleteFile(filepath) {
        try {
            const keys = filepath.split('/');
            if (keys[0].indexOf(this.options.url)) {
                keys.shift();
            }
            const instance = this.getInstance();
            const options = {
                Bucket: this.options.bucket,
                Region: this.options.region,
                Key: keys.join('/'),
            };
            const result = await instance.deleteObject(options);
            return result;
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
};
exports.CosService = CosService;
exports.CosService = CosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Inject)(cos_constants_1.COS_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], CosService);
//# sourceMappingURL=cos.service.js.map