import { Type } from "class-transformer";
import { IsInt, IsNumber, IsOptional, IsPositive } from "class-validator";

export class QueryMoviesDto {
    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    page: number;

    @IsOptional()
    @Type(() => Number)
    @IsPositive()
    limit: number;
  }