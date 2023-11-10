import { GetAllMoviesDto, IMovie } from './interfaces/IMovie.interface';
import { CreateMovieDto } from './dto/CreateMovieDTO';
import { GetMovieDto } from './dto/GetMovieDTO';
import { UpdateMovieDto } from './dto/UpdateMovieDTO';
export declare class MoviesService implements IMovie {
    private readonly moviesDao;
    constructor(moviesDao: IMovie);
    create(movie: CreateMovieDto): Promise<GetMovieDto>;
    updateById(id: string, movie: UpdateMovieDto): Promise<GetMovieDto>;
    getById(id: string): Promise<GetMovieDto>;
    getAll(query: any): Promise<GetAllMoviesDto>;
    deleteById(id: string): Promise<GetMovieDto>;
}
