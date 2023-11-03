import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  publisher_user?: string;


  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  director: string;

  @ApiProperty()
  @IsString()
  producer: string;

  @ApiProperty()
  @IsDateString()
  release_date: Date;

  @ApiProperty()
  @IsNumber()
  duration: number;

  @ApiProperty()
  @IsNumber()
  seasons: number;

  @ApiProperty()
  @IsNumber()
  chapters: number;

  @ApiProperty()
  @IsString()
  url: string;
}