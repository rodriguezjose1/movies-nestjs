import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie } from '../../../../models/movie.model';
import { CreateMovieDto } from '../../dto/CreateMovieDTO';
import { GetMovieDto } from '../../dto/GetMovieDTO';
import { GetAllMoviesDto, IMovie } from '../../interfaces/IMovie.interface';

@Injectable()
export class MongoMoviesDao implements IMovie {
    constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) { }

    mapToDto(movie: Movie): GetMovieDto {
        const { _id, __v, deleted, ...rest } = movie.toJSON();
        const mapped: any = {
            id: _id,
            ...rest
        }

        return mapped
    }

    mapMoviesToDto(movies) {
        return movies.map(movie => this.mapToDto(movie))
    }

    async create(movie: CreateMovieDto) {
        const createdMovie = await this.movieModel.create(movie);
        return this.mapToDto(createdMovie);
    }

    async updateById(id: any, movie: CreateMovieDto) {
        const movieDB = await this.getById(id);
        if (!movieDB) return null;

        const updatedMovie = await this.movieModel.findOneAndUpdate({ _id: id, deleted: false }, { $set: { ...movie } }, { new: true });
        return this.mapToDto(updatedMovie);
    }

    async getById(id: string): Promise<any> {
        const movie = await this.movieModel.findOne({ _id: id, deleted: false });
        if (!movie) return null;
        return this.mapToDto(movie);
    }

    async getAll(query) {
        let page = 1;
        let skip = 0;
        let limit = 50;
        if (query.limit) limit = query.limit;
        if (query.page) {
            page = query.page;
            skip = (query.page - 1) * limit;
        }

        const movies = await this.movieModel.find({ deleted: false }).skip(skip).limit(limit);
        const total = await this.movieModel.count({ deleted: false });

        return { movies: this.mapMoviesToDto(movies), total};
    }

    async deleteById(id: string): Promise<any> {
        const movie = await this.movieModel.findOneAndUpdate({ _id: id }, { $set: { deleted: true } }, { new: true });
        if (!movie) return null;
        return { id: movie._id };
    }
}
