import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsStrongPassword } from 'class-validator';
export class UpdateUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastname?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsStrongPassword()
  @IsOptional()
  password?: string;

  role?: string;
  refresh_token?: string;
}