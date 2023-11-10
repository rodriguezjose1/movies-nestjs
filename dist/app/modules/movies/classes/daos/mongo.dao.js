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
exports.MongoMoviesDao = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const movie_model_1 = require("../../../../models/movie.model");
let MongoMoviesDao = class MongoMoviesDao {
    constructor(movieModel) {
        this.movieModel = movieModel;
    }
    mapToDto(movie) {
        const { _id, __v, deleted, ...rest } = movie.toJSON();
        const mapped = {
            id: _id,
            ...rest
        };
        return mapped;
    }
    mapMoviesToDto(movies) {
        return movies.map(movie => this.mapToDto(movie));
    }
    async create(movie) {
        const createdMovie = await this.movieModel.create(movie);
        return this.mapToDto(createdMovie);
    }
    async updateById(id, movie) {
        const movieDB = await this.getById(id);
        if (!movieDB)
            return null;
        const updatedMovie = await this.movieModel.findOneAndUpdate({ _id: id, deleted: false }, { $set: { ...movie } }, { new: true });
        return this.mapToDto(updatedMovie);
    }
    async getById(id) {
        const movie = await this.movieModel.findOne({ _id: id, deleted: false });
        if (!movie)
            return null;
        return this.mapToDto(movie);
    }
    async getAll(query) {
        let page = 1;
        let skip = 0;
        let limit = 50;
        if (query.limit)
            limit = query.limit;
        if (query.page) {
            page = query.page;
            skip = (query.page - 1) * limit;
        }
        const movies = await this.movieModel.find({ deleted: false }).skip(skip).limit(limit);
        const total = await this.movieModel.count({ deleted: false });
        return { movies: this.mapMoviesToDto(movies), total };
    }
    async deleteById(id) {
        const movie = await this.movieModel.findOneAndUpdate({ _id: id }, { $set: { deleted: true } }, { new: true });
        if (!movie)
            return null;
        return { id: movie._id };
    }
};
exports.MongoMoviesDao = MongoMoviesDao;
exports.MongoMoviesDao = MongoMoviesDao = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(movie_model_1.Movie.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongoMoviesDao);
//# sourceMappingURL=mongo.dao.js.map