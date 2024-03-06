"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequireLogin = exports.Auth = void 0;
const common_1 = require("@nestjs/common");
const Auth = () => (0, common_1.SetMetadata)('require-login', true);
exports.Auth = Auth;
const RequireLogin = () => (0, common_1.SetMetadata)('require-login', true);
exports.RequireLogin = RequireLogin;
//# sourceMappingURL=auth.decorator.js.map