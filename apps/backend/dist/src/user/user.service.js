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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const MyLogger_1 = require("../winston/MyLogger");
const winston_module_1 = require("../winston/winston.module");
const user_model_1 = require("../models/user.model");
const sequelize_1 = require("@nestjs/sequelize");
const utils_1 = require("../utils");
const response_1 = require("../response");
const redis_module_1 = require("../redis/redis.module");
const ioredis_1 = require("ioredis");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async register(user) {
        const foundUser = await this.userModel.findOne({
            where: {
                username: user.username,
            },
        });
        if (foundUser) {
            throw new common_1.HttpException('用户已存在', 200);
        }
        try {
            await this.userModel.create({
                username: user.username,
                password: (0, utils_1.md5)(user.password),
            });
            return response_1.Res.OK('注册成功');
        }
        catch (e) {
            return response_1.Res.Error('注册失败');
        }
    }
    async login(user) {
        const foundUser = await this.userModel.findOne({
            where: {
                username: user.username,
            },
        });
        if (!foundUser) {
            throw new common_1.HttpException('用户名不存在', 400);
        }
        if (foundUser.password !== (0, utils_1.md5)(user.password)) {
            throw new common_1.HttpException('密码错误', 400);
        }
        return foundUser;
    }
    async getList() {
        const list = await this.userModel.findAll({
            attributes: {
                exclude: ['password'],
            },
        });
        return response_1.Res.List(list);
    }
    async getListByPage(page = 1, limit = 10) {
        const { rows, count } = await this.userModel.findAndCountAll({
            attributes: {
                exclude: ['password'],
            },
            offset: (0, utils_1.getPageOffset)(page, limit),
            limit: limit,
        });
        return response_1.Res.Page(rows, page, count);
    }
};
exports.UserService = UserService;
__decorate([
    (0, common_1.Inject)(winston_module_1.WINSTON_LOGGER_TOKEN),
    __metadata("design:type", MyLogger_1.MyLogger)
], UserService.prototype, "logger", void 0);
__decorate([
    (0, common_1.Inject)(redis_module_1.REDIS_TOKEN),
    __metadata("design:type", ioredis_1.default)
], UserService.prototype, "redisClient", void 0);
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, sequelize_1.InjectModel)(user_model_1.UserModel)),
    __metadata("design:paramtypes", [Object])
], UserService);
//# sourceMappingURL=user.service.js.map