"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaosModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongo_dao_1 = require("./mongo.dao");
const movie_model_1 = require("../../../../models/movie.model");
let DaosModule = class DaosModule {
};
exports.DaosModule = DaosModule;
exports.DaosModule = DaosModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: movie_model_1.Movie.name, schema: movie_model_1.MovieSchema }])],
        providers: [mongo_dao_1.MongoMoviesDao],
        exports: [mongo_dao_1.MongoMoviesDao, mongoose_1.MongooseModule]
    })
], DaosModule);
//# sourceMappingURL=daos.module.js.map