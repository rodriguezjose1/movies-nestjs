"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const IMovie_interface_1 = require("./interfaces/IMovie.interface");
let MoviesService = class MoviesService {
    constructor(moviesDao) {
        this.moviesDao = moviesDao;
    }
    async create(movie) {
        return this.moviesDao.create(movie);
    }
    updateById(id, movie) {
        return this.moviesDao.updateById(id, movie);
    }
    getById(id) {
        return this.moviesDao.getById(id);
    }
    async getAll(query) {
        const result = await this.moviesDao.getAll(query);
        return {
            movies: result.movies,
            total: result.total,
        };
    }
    deleteById(id) {
        return this.moviesDao.deleteById(id);
    }
};
exports.MoviesService = MoviesService;
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(IMovie_interface_1.IMovieDao)),
    __metadata("design:paramtypes", [Object])
], MoviesService);
//# sourceMappingURL=movies.service.js.map