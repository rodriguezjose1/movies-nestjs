import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, Model, connect } from 'mongoose';
import { Movie, MovieSchema } from '../../../app/models/movie.model';
import { MongoMoviesDao } from '../movies/classes/daos/mongo.dao';
import { IMovieDao } from '../movies/interfaces/IMovie.interface';
import { CreateMovieDto } from './dto/CreateMovieDTO';
import { UpdateMovieDto } from './dto/UpdateMovieDTO';
import { MoviesService } from './movies.service';

describe('MovieController', () => {

    let moviesService: MoviesService;

    let mongod: MongoMemoryServer;
    let mongoConnection: Connection;

    let movieModel: Model<Movie>;

    let movieDB = null;

    const body: CreateMovieDto = {
        title: "La ultima cena",
        director: "Pepe Jacson",
        producer: "Cofre Badon",
        release_date: new Date("2021-03-01"),
        duration: 120,
        seasons: 0,
        chapters: 0,
        url: "https://www.netflix.com/title/80114139"
    };

    const update: UpdateMovieDto = {
        title: 'New Title',
    };

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoConnection = (await connect(uri)).connection;
        movieModel = mongoConnection.model(Movie.name, MovieSchema);

        const app: TestingModule = await Test.createTestingModule({
        
            providers: [
                MoviesService,
                { provide: IMovieDao, useClass: MongoMoviesDao },
                { provide: getModelToken(Movie.name), useValue: movieModel },
            ],
        }).compile();

        moviesService = app.get<MoviesService>(MoviesService);
    });

    beforeEach(async () => {
        movieDB = await movieModel.create({
            ...body,
        })
    });

    afterAll(async () => {
    
        await mongoConnection.close();
        await mongod.stop();
    });

    afterEach(async () => {
        const collections = mongoConnection.collections;
        for (const key in collections) {
            const collection = collections[key];
            await collection.deleteMany({});
        }
    })

    describe('movies', () => {
        it('should create a new Movie', async () => {
            const result = await moviesService.create(body);
            expect(result.title).toBe(body.title);
        });

        it('should update a movie', async () => {
            const result = await moviesService.updateById(movieDB._id, update);
            expect(result.title).toBe(update.title);
        });

        it('should update a movie', async () => {
            const result = await moviesService.deleteById(movieDB._id);
            expect(result.id.toString()).toBe(movieDB._id.toString());
        });
    });
});
