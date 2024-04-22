"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBucketConfig = exports.CONFIG = exports.getConfig = exports.IS_DEV = exports.getEnv = void 0;
const process_1 = require("process");
const fs = require("fs");
const yaml_1 = require("yaml");
const path = require("path");
/**
 * 获取项目运行环境
 */
const getEnv = () => {
    return process_1.env.RUNNING_ENV;
};
exports.getEnv = getEnv;
exports.IS_DEV = (0, exports.getEnv)() === 'dev';
/**
 * 读取项目配置
 */
function getConfig() {
    var _a, _b;
    const environment = (0, exports.getEnv)();
    let localConfig = {};
    try {
        const localYamlPath = path.join((0, process_1.cwd)(), './application.local.yaml');
        const localFile = fs.readFileSync(localYamlPath, 'utf8');
        localConfig = (_a = (0, yaml_1.parse)(localFile)) !== null && _a !== void 0 ? _a : {};
    }
    catch (e) { }
    const yamlPath = path.join((0, process_1.cwd)(), `./application.${environment}.yaml`);
    const file = fs.readFileSync(yamlPath, 'utf8');
    const config = (_b = (0, yaml_1.parse)(file)) !== null && _b !== void 0 ? _b : {};
    const mergeConfig = Object.assign(Object.assign({}, localConfig), config);
    return Object.assign({}, mergeConfig);
}
exports.getConfig = getConfig;
exports.CONFIG = getConfig();
/**
 * 获取响应的对象存储配置
 * @param type 对象存储的种类
 */
function getBucketConfig(type) {
    var _a, _b, _c;
    const bConfig = ((_b = (_a = getConfig()) === null || _a === void 0 ? void 0 : _a['bucket']) !== null && _b !== void 0 ? _b : {});
    return ((_c = bConfig[type]) !== null && _c !== void 0 ? _c : {});
}
exports.getBucketConfig = getBucketConfig;
//# sourceMappingURL=config.js.map