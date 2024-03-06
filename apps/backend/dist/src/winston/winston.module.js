"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var WinstonModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinstonModule = exports.WINSTON_LOGGER_TOKEN = void 0;
const common_1 = require("@nestjs/common");
const MyLogger_1 = require("./MyLogger");
exports.WINSTON_LOGGER_TOKEN = 'WINSTON_LOGGER';
let WinstonModule = WinstonModule_1 = class WinstonModule {
    static forRoot(options) {
        return {
            module: WinstonModule_1,
            providers: [
                {
                    provide: exports.WINSTON_LOGGER_TOKEN,
                    useValue: new MyLogger_1.MyLogger(options),
                },
            ],
            exports: [exports.WINSTON_LOGGER_TOKEN],
        };
    }
};
exports.WinstonModule = WinstonModule;
exports.WinstonModule = WinstonModule = WinstonModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], WinstonModule);
//# sourceMappingURL=winston.module.js.map