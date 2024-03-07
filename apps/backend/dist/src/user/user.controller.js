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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const login_dto_1 = require("./dto/login.dto");
const register_dto_1 = require("./dto/register.dto");
const jwt_1 = require("@nestjs/jwt");
const response_1 = require("../response");
const auth_decorator_1 = require("../auth/auth.decorator");
const winston_module_1 = require("../winston/winston.module");
const MyLogger_1 = require("../winston/MyLogger");
let UserController = class UserController {
    constructor(userService, jwtService, logger) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.logger = logger;
    }
    async login(user, response) {
        const foundUser = await this.userService.login(user);
        if (foundUser) {
            const data = {
                user: {
                    id: foundUser.id,
                    username: foundUser.username,
                    roles: foundUser.roles
                },
            };
            const payload = JSON.stringify(data);
            const access_token = await this.jwtService.signAsync(data, {
                expiresIn: '30m'
            });
            const refresh_token = await this.jwtService.signAsync({
                userId: foundUser.id
            }, {
                expiresIn: '7d'
            });
            return response_1.Res.OK('登录成功', 200, {
                access_token,
                refresh_token
            });
        }
        else {
            return response_1.Res.Error('登录失败');
        }
    }
    async refresh(refreshToken) {
        try {
            const data = this.jwtService.verify(refreshToken);
            const user = await this.userService.getUserInfo(data.userId);
            const payload = {
                user: {
                    userId: user.id,
                    username: user.username,
                    roles: user.roles
                }
            };
            const access_token = this.jwtService.sign(payload, {
                expiresIn: "30m"
            });
            const refresh_token = this.jwtService.sign({
                userId: user.id
            }, {
                expiresIn: "7d"
            });
            return response_1.Res.OKWithData({
                access_token,
                refresh_token
            });
        }
        catch (e) {
            throw new common_1.UnauthorizedException('登录超时，请重新登录');
        }
    }
    register(user) {
        return this.userService.register(user);
    }
    getAll() {
        return this.userService.getList();
    }
    async getDetail(token) {
        try {
            const data = this.jwtService.verify(token);
            const user = await this.userService.getUserInfo(data.user.id);
            if (user) {
                return response_1.Res.OKWithData(user);
            }
            else {
                return response_1.Res.Error();
            }
        }
        catch (e) {
            return response_1.Res.ServerError(e.message);
        }
    }
    deleteOne(userId) {
        return this.userService.deleteOne(userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('refresh'),
    __param(0, (0, common_1.Query)('refresh_token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "refresh", null);
__decorate([
    (0, common_1.Post)('register'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "register", null);
__decorate([
    (0, auth_decorator_1.Auth)(),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('getDetail'),
    __param(0, (0, common_1.Query)('token')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getDetail", null);
__decorate([
    (0, common_1.Delete)('/'),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "deleteOne", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __param(1, (0, common_1.Inject)(jwt_1.JwtService)),
    __param(2, (0, common_1.Inject)(winston_module_1.WINSTON_LOGGER_TOKEN)),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        MyLogger_1.MyLogger])
], UserController);
//# sourceMappingURL=user.controller.js.map