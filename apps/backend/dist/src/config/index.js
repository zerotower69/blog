"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = exports.IS_DEV = exports.getEnv = void 0;
const process_1 = require("process");
const fs = require("fs");
const yaml_1 = require("yaml");
const path = require("path");
const getEnv = () => {
    return process_1.env.RUNNING_ENV;
};
exports.getEnv = getEnv;
exports.IS_DEV = (0, exports.getEnv)() === 'dev';
function getConfig() {
    const environment = (0, exports.getEnv)();
    const yamlPath = path.join((0, process_1.cwd)(), `./application.${environment}.yaml`);
    const file = fs.readFileSync(yamlPath, 'utf8');
    const config = (0, yaml_1.parse)(file);
    return config;
}
exports.getConfig = getConfig;
//# sourceMappingURL=index.js.map