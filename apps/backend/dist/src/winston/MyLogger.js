"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLogger = void 0;
const dayjs = require("dayjs");
const winston_1 = require("winston");
class MyLogger {
    constructor(options) {
        this.logger = (0, winston_1.createLogger)(options);
    }
    error(message, context) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log('info', message, { context, time });
    }
    log(message, context) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log('info', message, { context, time });
    }
    warn(message, context) {
        const time = dayjs(Date.now()).format('YYYY-MM-DD HH:mm:ss');
        this.logger.log('info', message, { context, time });
    }
}
exports.MyLogger = MyLogger;
//# sourceMappingURL=MyLogger.js.map