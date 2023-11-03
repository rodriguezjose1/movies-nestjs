import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
export class UpdateMovieDto {
  publisher_user?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  director?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  producer?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  release_date?: Date;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  duration?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  seasons?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  chapters?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  url?: string;
}