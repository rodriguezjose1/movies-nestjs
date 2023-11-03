import { IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword } from 'class-validator';

export class GetUserDto {
    id: string;
    name: string;
    lastname: string;
    role?: string;
    email: string;
    password?: string;
    refresh_token?: string;

  }