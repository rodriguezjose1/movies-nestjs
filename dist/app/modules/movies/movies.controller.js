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
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const movies_service_1 = require("./movies.service");
const CreateMovieDTO_1 = require("./dto/CreateMovieDTO");
const UpdateMovieDTO_1 = require("./dto/UpdateMovieDTO");
const jwt_auth_guard_1 = require("../../../core/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const roles_guard_1 = require("../../../core/guards/roles.guard");
const auth_constants_1 = require("../auth/auth.constants");
const has_roles_decorator_1 = require("../../../core/decorators/has-roles.decorator");
const QueryMoviesDTO_1 = require("./dto/QueryMoviesDTO");
let MoviesController = class MoviesController {
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    async create(body, req) {
        body.publisher_user = req.user.id;
        const movie = await this.moviesService.create(body);
        return { movie };
    }
    async updateById(id, body, req) {
        const movie = await this.moviesService.updateById(id, body);
        if (!movie)
            throw new common_1.NotFoundException('Movie not found');
        return { movie };
    }
    async getById(id) {
        const movie = await this.moviesService.getById(id);
        return { movie };
    }
    async getAll(query) {
        const movies = await this.moviesService.getAll(query);
        return movies;
    }
    async deleteById(id) {
        const movie = await this.moviesService.deleteById(id);
        return { movie };
    }
};
exports.MoviesController = MoviesController;
__decorate([
    (0, common_1.Post)(),
    (0, has_roles_decorator_1.HasRoles)(auth_constants_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateMovieDTO_1.CreateMovieDto, Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, has_roles_decorator_1.HasRoles)(auth_constants_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, UpdateMovieDTO_1.UpdateMovieDto, Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "updateById", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, has_roles_decorator_1.HasRoles)(auth_constants_1.Role.User),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [QueryMoviesDTO_1.QueryMoviesDto]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, has_roles_decorator_1.HasRoles)(auth_constants_1.Role.Admin),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_guard_1.RolesGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "deleteById", null);
exports.MoviesController = MoviesController = __decorate([
    (0, swagger_1.ApiTags)('movies'),
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
//# sourceMappingURL=movies.controller.js.map