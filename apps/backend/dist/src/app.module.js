"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const models_1 = require("./models");
const user_module_1 = require("./user/user.module");
const winston_module_1 = require("./winston/winston.module");
const winston_1 = require("winston");
const chalk = require("chalk");
const jwt_1 = require("@nestjs/jwt");
const core_1 = require("@nestjs/core");
const httpCode_interceptor_1 = require("./interceptor/httpCode.interceptor");
const hello_filter_1 = require("./exception/hello.filter");
const unlogin_filter_1 = require("./exception/unlogin.filter");
const utils_1 = require("./utils");
const redis_module_1 = require("./redis/redis.module");
const login_guard_1 = require("./auth/login.guard");
const permission_guard_1 = require("./auth/permission.guard");
const config = (0, config_2.getConfig)();
const sqlConfig = config['mysql'] ?? {};
const logConfig = config['logger'] ?? {};
const jwtConfig = config['jwt'];
const redisConfig = config['redis'] ?? {};
const defaultModule = [
    config_1.ConfigModule.forRoot({
        ignoreEnvFile: false,
        isGlobal: true,
        load: [config_2.getConfig],
    }),
    winston_module_1.WinstonModule.forRoot({
        level: logConfig?.level ?? 'info',
        transports: [
            new winston_1.transports.Console({
                format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.printf(({ context, level, message, time }) => {
                    const appStr = chalk.green(`[NEST]`);
                    const contextStr = chalk.yellow(`[${context}]`);
                    return `${appStr} ${time} ${level} ${contextStr} ${message} `;
                })),
            }),
            new winston_1.transports.File({
                format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
                filename: logConfig?.filename ?? 'app.log',
                dirname: logConfig?.dirname ?? 'log',
            }),
        ],
    }),
    jwt_1.JwtModule.register({
        global: true,
        secret: jwtConfig.secret,
        signOptions: {
            expiresIn: jwtConfig.expireIn,
        },
    }),
    sequelize_1.SequelizeModule.forRoot({
        host: 'localhost',
        port: 3306,
        autoLoadModels: false,
        synchronize: false,
        dialect: 'mysql',
        timezone: '+08:00',
        models: [models_1.UserModel, models_1.RoleModel, models_1.UserRoleModel, models_1.PermissionModel, models_1.RolePermissionModel],
        logging: false,
        ...sqlConfig,
    }),
    user_module_1.UserModule,
];
if (redisConfig?.enable ?? true) {
    let redisOptions = {
        port: redisConfig?.port ?? 6379,
        host: redisConfig?.host ?? '127.0.0.1',
    };
    if (redisConfig.enableAuth) {
        (0, utils_1.deleteKey)(redisOptions, 'port', 'host', 'enableAuth', 'enable');
        redisOptions = {
            ...redisOptions,
            ...redisConfig,
        };
    }
    defaultModule.push(redis_module_1.RedisModule.forRoot(redisOptions));
}
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: defaultModule,
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_INTERCEPTOR,
                useClass: httpCode_interceptor_1.HttpCodeInterceptor,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: hello_filter_1.HelloFilter,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: unlogin_filter_1.UnloginFilter,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: login_guard_1.LoginGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: permission_guard_1.PermissionGuard
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map