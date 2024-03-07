"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const role_service_1 = require("./role.service");
const user_controller_1 = require("./user.controller");
const sequelize_1 = require("@nestjs/sequelize");
const models_1 = require("../models");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([models_1.UserModel, models_1.RoleModel, models_1.PermissionModel])],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, role_service_1.RoleService],
        exports: [user_service_1.UserService, role_service_1.RoleService]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map