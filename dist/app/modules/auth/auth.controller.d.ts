import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/CreateUserDTO';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(createUserDto: CreateUserDto): Promise<{
        access_token: string;
        refresh_token: string;
        id: string;
        name: string;
        lastname: string;
        role?: string;
        email: string;
        password?: string;
    }>;
    login(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
    logout(req: any): Promise<void>;
    refreshTokens(req: any): Promise<{
        access_token: string;
        refresh_token: string;
    }>;
}
