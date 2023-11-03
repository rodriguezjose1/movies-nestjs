import { Module } from '@nestjs/common';
import { DaosModule } from './classes/daos/daos.module';
import { MongoMoviesDao } from './classes/daos/mongo.dao';
import { IMovieDao } from './interfaces/IMovie.interface';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  imports: [DaosModule],
  controllers: [MoviesController],
  providers: [
    MoviesService,
    {
      provide: IMovieDao,
      useClass: MongoMoviesDao
    },
  ],
  exports: [MoviesService]
})
export class MoviesModule { }
