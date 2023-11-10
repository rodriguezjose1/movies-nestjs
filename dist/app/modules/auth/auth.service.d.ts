import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/CreateUserDTO';
export declare class AuthService {
    private usersService;
    private jwtService;
    private configService;
    constructor(usersService: UsersService, jwtService: JwtService, configService: ConfigService);
    signUp(user: CreateUserDto, role: string): Promise<{
        access_token: string;
        refresh_token: string;
        id: string;
        name: string;
        lastname: string;
        role?: string;
        email: string;
        password?: string;
    }>;
    validateUser(email: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    private updateRefreshToken;
    private getTokens;
    logout(user: any): Promise<import("../users/dto/GetUserDTO").GetUserDto>;
    refreshTokens(userId: string, refreshToken: string): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
