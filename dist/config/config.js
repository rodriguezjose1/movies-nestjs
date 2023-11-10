"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurations = exports.Environment = exports.ConfigKey = void 0;
const config_1 = require("@nestjs/config");
var ConfigKey;
(function (ConfigKey) {
    ConfigKey["App"] = "APP";
    ConfigKey["Db"] = "DB";
})(ConfigKey || (exports.ConfigKey = ConfigKey = {}));
var Environment;
(function (Environment) {
    Environment["Local"] = "local";
    Environment["Development"] = "development";
    Environment["Staging"] = "staging";
    Environment["Production"] = "prod";
    Environment["Testing"] = "testing";
})(Environment || (exports.Environment = Environment = {}));
const APPConfig = (0, config_1.registerAs)(ConfigKey.App, () => ({
    env: Environment[process.env.NODE_ENV] ||
        'development',
    port: Number(process.env.APP_PORT),
    jwtTokenSecret: process.env.JWT_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    appName: process.env.APP_NAME,
}));
const DBConfig = (0, config_1.registerAs)(ConfigKey.Db, () => ({
    mongoUri: process.env.MONGO_URI,
}));
exports.configurations = [APPConfig, DBConfig];
//# sourceMappingURL=config.js.map