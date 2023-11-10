import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/CreateMovieDTO';
import { UpdateMovieDto } from './dto/UpdateMovieDTO';
import { QueryMoviesDto } from './dto/QueryMoviesDTO';
export declare class MoviesController {
    private readonly moviesService;
    constructor(moviesService: MoviesService);
    create(body: CreateMovieDto, req: any): Promise<{
        movie: import("./dto/GetMovieDTO").GetMovieDto;
    }>;
    updateById(id: string, body: UpdateMovieDto, req: any): Promise<{
        movie: import("./dto/GetMovieDTO").GetMovieDto;
    }>;
    getById(id: string): Promise<{
        movie: import("./dto/GetMovieDTO").GetMovieDto;
    }>;
    getAll(query: QueryMoviesDto): Promise<import("./interfaces/IMovie.interface").GetAllMoviesDto>;
    deleteById(id: string): Promise<{
        movie: import("./dto/GetMovieDTO").GetMovieDto;
    }>;
}
