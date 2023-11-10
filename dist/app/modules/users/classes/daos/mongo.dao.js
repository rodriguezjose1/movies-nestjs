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
exports.MongoUsersDao = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_model_1 = require("../../../../models/user.model");
let MongoUsersDao = class MongoUsersDao {
    constructor(userModel) {
        this.userModel = userModel;
    }
    mapToDto(user, { password = false, refresh_token = false, role = false } = {}) {
        const mapped = {
            id: user._id,
            name: user.name.toString(),
            lastname: user.lastname,
            email: user.email
        };
        if (password) {
            mapped.password = user.password;
        }
        if (refresh_token) {
            mapped.refresh_token = user.refresh_token;
        }
        if (role) {
            mapped.role = user.role;
        }
        return mapped;
    }
    mapUsersToDto(users) {
        return users.map(user => this.mapToDto(user));
    }
    async create(user) {
        const createdUser = await this.userModel.create(user);
        return this.mapToDto(createdUser);
    }
    async updateById(id, user) {
        const userDB = await this.getById(id, { refresh_token: true });
        if (!userDB)
            return null;
        const updatedUser = await this.userModel.findOneAndUpdate({ _id: id }, { $set: { ...user } }, { new: true });
        return this.mapToDto(updatedUser);
    }
    async getAll(userLogged) {
        const users = await this.userModel.find();
        if (!users)
            return null;
        return this.mapUsersToDto(users);
    }
    async getById(id, options) {
        const user = await this.userModel.findById(id);
        if (!user)
            return null;
        return this.mapToDto(user, options);
    }
    async getByEmail(email) {
        const user = await this.userModel.findOne({ email });
        if (!user)
            return null;
        return this.mapToDto(user, { password: true });
        ;
    }
};
exports.MongoUsersDao = MongoUsersDao;
exports.MongoUsersDao = MongoUsersDao = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_model_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], MongoUsersDao);
//# sourceMappingURL=mongo.dao.js.map