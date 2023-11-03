import { Inject, Injectable } from '@nestjs/common';
import { GetAllMoviesDto, IMovie, IMovieDao } from './interfaces/IMovie.interface';

import { CreateMovieDto } from './dto/CreateMovieDTO';
import { GetMovieDto } from './dto/GetMovieDTO';
import { UpdateMovieDto } from './dto/UpdateMovieDTO';

@Injectable()
export class MoviesService implements IMovie {
    constructor(@Inject(IMovieDao) private readonly moviesDao: IMovie) {}
    async create(movie: CreateMovieDto): Promise<GetMovieDto> {

        return this.moviesDao.create(movie);
    }
    updateById(id: string, movie: UpdateMovieDto): Promise<GetMovieDto> {
        return this.moviesDao.updateById(id, movie);
    }

    getById(id: string): Promise<GetMovieDto> {
        return this.moviesDao.getById(id);
    }

    async getAll(query): Promise<GetAllMoviesDto> {
        const result = await this.moviesDao.getAll(query);
        return {
            movies: result.movies,
            total: result.total,
        }
    }

    deleteById(id: string): Promise<GetMovieDto> {
        return this.moviesDao.deleteById(id);
    }
}
