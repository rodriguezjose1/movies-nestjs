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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./app/modules/users/users.module");
const config_module_1 = require("./config/config.module");
const mongo_module_1 = require("./database/mongo/mongo.module");
const mongoose_1 = require("mongoose");
const auth_module_1 = require("./app/modules/auth/auth.module");
const throttler_1 = require("@nestjs/throttler");
const core_1 = require("@nestjs/core");
const movies_module_1 = require("./app/modules/movies/movies.module");
mongoose_1.default.set('debug', true);
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_module_1.ConfigsModule,
            mongo_module_1.MongooseConfigModule,
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            movies_module_1.MoviesModule,
            throttler_1.ThrottlerModule.forRoot([{
                    ttl: 60000,
                    limit: 100,
                }]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard
            }
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map