import { Model } from 'mongoose';
import { Movie } from '../../../../models/movie.model';
import { CreateMovieDto } from '../../dto/CreateMovieDTO';
import { GetMovieDto } from '../../dto/GetMovieDTO';
import { IMovie } from '../../interfaces/IMovie.interface';
export declare class MongoMoviesDao implements IMovie {
    private movieModel;
    constructor(movieModel: Model<Movie>);
    mapToDto(movie: Movie): GetMovieDto;
    mapMoviesToDto(movies: any): any;
    create(movie: CreateMovieDto): Promise<GetMovieDto>;
    updateById(id: any, movie: CreateMovieDto): Promise<GetMovieDto>;
    getById(id: string): Promise<any>;
    getAll(query: any): Promise<{
        movies: any;
        total: number;
    }>;
    deleteById(id: string): Promise<any>;
}
