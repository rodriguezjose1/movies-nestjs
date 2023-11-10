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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, configService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async signUp(user, role) {
        const userExists = await this.usersService.getByEmail(user.email);
        if (userExists) {
            throw new common_1.BadRequestException('User already exists');
        }
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltOrRounds);
        user.password = hashedPassword;
        user.role = role;
        const newUser = await this.usersService.create(user);
        const tokens = await this.getTokens(newUser.id, newUser.email, newUser.role);
        await this.updateRefreshToken(newUser.id, tokens.refreshToken);
        return { ...newUser, access_token: tokens.accessToken, refresh_token: tokens.refreshToken };
    }
    async validateUser(email, pass) {
        const user = await this.usersService.getByEmail(email);
        if (!user)
            return null;
        const passwordValid = bcrypt.compareSync(pass, user.password);
        if (passwordValid) {
            delete user.password;
            return user;
        }
        return null;
    }
    async login(user) {
        const { accessToken, refreshToken } = await this.getTokens(user.id, user.email, user.role);
        await this.updateRefreshToken(user.id, refreshToken);
        return {
            access_token: accessToken,
            refresh_token: refreshToken
        };
    }
    async updateRefreshToken(userId, refreshToken) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, bcrypt.genSaltSync());
        await this.usersService.updateById(userId, {
            refresh_token: hashedRefreshToken,
        });
    }
    async getTokens(userId, username, role) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync({
                sub: userId,
                email: username,
                role
            }, {
                secret: this.configService.get('JWT_TOKEN_SECRET'),
                expiresIn: '1h',
            }),
            this.jwtService.signAsync({
                sub: userId,
                email: username,
                role
            }, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: '7d',
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
    async logout(user) {
        return this.usersService.updateById(user.userId, { refresh_token: null });
    }
    async refreshTokens(userId, refreshToken) {
        const user = await this.usersService.getById(userId, { refresh_token: true });
        if (!user || !user.refresh_token)
            throw new common_1.ForbiddenException('Access Denied');
        const refreshTokenMatches = bcrypt.compareSync(refreshToken, user.refresh_token);
        if (!refreshTokenMatches)
            throw new common_1.ForbiddenException('Access Denied');
        const tokens = await this.getTokens(user.id, user.email, user.role);
        await this.updateRefreshToken(user.id, tokens.refreshToken);
        return { access_token: tokens.accessToken, refresh_token: tokens.refreshToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map