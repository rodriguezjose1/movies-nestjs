import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoMoviesDao } from './mongo.dao';
import { Movie, MovieSchema } from '../../../../models/movie.model';

// todo: ver import dinamico
@Module({
  imports: [MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }])],
  providers: [MongoMoviesDao],
  exports: [MongoMoviesDao, MongooseModule]
})
export class DaosModule { }
