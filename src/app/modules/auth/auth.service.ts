import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/CreateUserDTO';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService
  ) { }

  async signUp(user: CreateUserDto, role: string) {
    const userExists = await this.usersService.getByEmail(user.email);
    if (userExists) {
      throw new BadRequestException('User already exists');
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

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.getByEmail(email);

    if (!user) return null;

    const passwordValid = bcrypt.compareSync(pass, user.password)
    if (passwordValid) {
      delete user.password;
      return user;
    }

    return null;
  }

  async login(user: any) {
    const { accessToken, refreshToken } = await this.getTokens(user.id, user.email, user.role);

    await this.updateRefreshToken(user.id, refreshToken);

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    };
  }

  private async updateRefreshToken(userId: string, refreshToken: string) {

    const hashedRefreshToken = await bcrypt.hash(refreshToken, bcrypt.genSaltSync());

    await this.usersService.updateById(userId, {
      refresh_token: hashedRefreshToken,
    });
  }

  private async getTokens(userId: string, username: string, role: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email: username,
          role
        },
        {
          secret: this.configService.get<string>('JWT_TOKEN_SECRET'),
          expiresIn: '1h',
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email: username,
          role
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: '7d',
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async logout(user: any) {
    return this.usersService.updateById(user.userId, { refresh_token: null });
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.getById(userId, { refresh_token: true });
    if (!user || !user.refresh_token)
      throw new ForbiddenException('Access Denied');
    const refreshTokenMatches = bcrypt.compareSync(
      refreshToken,
      user.refresh_token,
    );
    if (!refreshTokenMatches) throw new ForbiddenException('Access Denied');
    const tokens = await this.getTokens(user.id, user.email, user.role);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return { access_token: tokens.accessToken, refresh_token: tokens.refreshToken };
  }
}