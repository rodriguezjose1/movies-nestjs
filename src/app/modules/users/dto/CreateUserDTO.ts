import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    name: string;
    
    @ApiProperty()
    @IsString()
    lastname: string;

    @ApiProperty()
    @IsString()
    @IsStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minSymbols: 1,
      minUppercase: 1
    })
    password: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    role: string;
    refresh_token?: string;
  }