"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesModule = void 0;
const common_1 = require("@nestjs/common");
const daos_module_1 = require("./classes/daos/daos.module");
const mongo_dao_1 = require("./classes/daos/mongo.dao");
const IMovie_interface_1 = require("./interfaces/IMovie.interface");
const movies_controller_1 = require("./movies.controller");
const movies_service_1 = require("./movies.service");
let MoviesModule = class MoviesModule {
};
exports.MoviesModule = MoviesModule;
exports.MoviesModule = MoviesModule = __decorate([
    (0, common_1.Module)({
        imports: [daos_module_1.DaosModule],
        controllers: [movies_controller_1.MoviesController],
        providers: [
            movies_service_1.MoviesService,
            {
                provide: IMovie_interface_1.IMovieDao,
                useClass: mongo_dao_1.MongoMoviesDao
            },
        ],
        exports: [movies_service_1.MoviesService]
    })
], MoviesModule);
//# sourceMappingURL=movies.module.js.map