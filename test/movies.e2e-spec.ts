import { ExecutionContext, INestApplication, VersioningType } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Connection, Model, connect } from 'mongoose';
import { Movie, MovieSchema } from '../src/app/models/movie.model';
import { CreateMovieDto } from '../src/app/modules/movies/dto/CreateMovieDTO';
import * as request from 'supertest';
import { MoviesModule } from '../src/app/modules/movies/movies.module';
import { IMovieDao } from '../src/app/modules/movies/interfaces/IMovie.interface';
import { MongooseModule, getModelToken } from '@nestjs/mongoose';
import { MongoMoviesDao } from '../src/app/modules/movies/classes/daos/mongo.dao';
import { MongooseConfigModule } from '../src/database/mongo/mongo.module';
import { ConfigsModule } from '../src/config/config.module';
import { AuthModule } from '../src/app/modules/auth/auth.module';
import { User, UserSchema } from '../src/app/models/user.model';
import { UsersService } from '../src/app/modules/users/users.service';
import { MongoUsersDao } from 'src/app/modules/users/classes/daos/mongo.dao';
import { AuthService } from '../src/app/modules/auth/auth.service';

describe('MoviesController (e2e)', () => {
  let app: INestApplication;

  const bodyUser = {
    name: 'test',
    lastname: 'test',
    password: '123',
    email: 'test@gmail.com',
    refresh_token: null
  };

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

  let movieDB = null;

  let regularUser = null;
  let adminUser = null;
  let adminTokens = null;

  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;
  let movieModel: Model<Movie>;
  let userModel: Model<User>;
  let authService: AuthService;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();

    process.env.MONGO_URI = uri;


    mongoConnection = (await connect(uri)).connection;
    movieModel = mongoConnection.model(Movie.name, MovieSchema);
    userModel = mongoConnection.model(User.name, UserSchema);

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigsModule,
        MongooseConfigModule,
        AuthModule,
        MoviesModule
      ],
      providers: [
        { provide: IMovieDao, useClass: MongoMoviesDao },
        { provide: getModelToken(Movie.name), useValue: movieModel },
        { provide: getModelToken(User.name), useValue: userModel },
      ],
    }).compile();


    app = moduleFixture.createNestApplication();

    authService = app.get<AuthService>(AuthService);

    app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' })

    await app.init();


    regularUser = await request(app.getHttpServer())
      .post('/v1/auth/signup')
      .send(bodyUser)
      .then((res) => res.body);

    adminUser = await authService.signUp({ ...bodyUser, email: 'test2@gmail.com', role: '' }, 'administrator');

    movieDB = await movieModel.create(body);

  });

  afterAll(async () => {
    // await mongoConnection.dropDatabase();
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
    await mongoConnection.close();
    await mongod.stop();
  });

  describe('POST Movies', () => {
    it('/ POST Movies - OK', () => {
      return request(app.getHttpServer())
        .post('/v1/movies')
        .send(body)
        .set('Authorization', `Bearer ${adminUser.access_token}`)
        .expect(201);
    });

    it('/ POST Movies - OK', () => {
      return request(app.getHttpServer())
        .post('/v1/movies')
        .send(body)
        .expect(401);
    });

    it('/ POST Movies - Forbidden', () => {
      return request(app.getHttpServer())
        .post('/v1/movies')
        .auth(regularUser.access_token, { type: 'bearer' })
        .send(body)
        .expect(403);
    });
  });

  describe('PUT Movies', () => {
    it('/ PUT Movies - OK', () => {
      return request(app.getHttpServer())
        .put(`/v1/movies/${movieDB._id}`)
        .auth(adminUser.access_token, { type: 'bearer' })
        .send(body)
        .expect(200);
    });

    it('/ PUT Movies - Unauthorized', () => {
      return request(app.getHttpServer())
        .put(`/v1/movies/${movieDB._id}`)
        .send(body)
        .expect(401);
    });

    it('/ PUT Movies - Forbidden', () => {
      return request(app.getHttpServer())
        .put(`/v1/movies/${movieDB._id}`)
        .auth(regularUser.access_token, { type: 'bearer' })
        .send(body)
        .expect(403);
    });
  });

  describe('DELETE Movies', () => {
    it('/ DELETE Movies - OK', () => {
      return request(app.getHttpServer())
        .delete(`/v1/movies/${movieDB._id}`)
        .auth(adminUser.access_token, { type: 'bearer' })
        .send(body)
        .expect(200);
    });

    it('/ DELETE Movies - Unauthorized', () => {
      return request(app.getHttpServer())
        .delete(`/v1/movies/${movieDB._id}`)
        .send(body)
        .expect(401);
    });

    it('/ DELETE Movies - Forbidden', () => {
      return request(app.getHttpServer())
        .delete(`/v1/movies/${movieDB._id}`)
        .auth(regularUser.access_token, { type: 'bearer' })
        .send(body)
        .expect(403);
    });
  });
});
