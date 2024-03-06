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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleModel = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let RoleModel = class RoleModel extends sequelize_typescript_1.Model {
};
exports.RoleModel = RoleModel;
__decorate([
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Comment)('id'),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    __metadata("design:type", Number)
], RoleModel.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)('角色标识'),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
    __metadata("design:type", String)
], RoleModel.prototype, "code", void 0);
__decorate([
    (0, sequelize_typescript_1.Comment)('角色名(中文)'),
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING(30)),
    __metadata("design:type", String)
], RoleModel.prototype, "name", void 0);
exports.RoleModel = RoleModel = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 't_role',
        timestamps: false,
    })
], RoleModel);
//# sourceMappingURL=role.model.js.map