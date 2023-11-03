import { CreateMovieDto } from "../dto/CreateMovieDTO";
import { GetMovieDto } from "../dto/GetMovieDTO";
import { UpdateMovieDto } from "../dto/UpdateMovieDTO";

export interface GetAllMoviesDto {
    movies: GetMovieDto[],
    total: number,
    limit?: number,
}

export interface IMovie {
    create(user: CreateMovieDto): Promise<GetMovieDto>;
    updateById(id: string, user: UpdateMovieDto): Promise<GetMovieDto>;
    getById(id: string): Promise<GetMovieDto>;
    getAll(query): Promise<GetAllMoviesDto>;
    deleteById(id: string): Promise<GetMovieDto>;
}

export const IMovieDao = Symbol("IMovieDao");