import { Body, Controller, Get, Post, Req, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../core/guards/jwt-auth.guard';
import { LocalAuthGuard } from '../../../core/guards/local-auth.guard';
import { AuthService } from './auth.service';

import { RefreshTokenGuard } from '../../../core/guards/refres-token-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from '../users/dto/CreateUserDTO';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    signup(@Body() createUserDto: CreateUserDto) {
        return this.authService.signUp(createUserDto, 'regular');
    }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(JwtAuthGuard)
    @Get('logout')
    async logout(@Request() req: any) {
        await this.authService.logout(req.user);
    }

    @UseGuards(RefreshTokenGuard)
    @Get('refresh')
    refreshTokens(@Req() req: any) {
        const userId = req.user['sub'];
        const refreshToken = req.user['refreshToken'];

        return this.authService.refreshTokens(userId, refreshToken);
    }
}