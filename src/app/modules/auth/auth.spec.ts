import { Test, TestingModule } from '@nestjs/testing';
// import { AuthController } from './auth.controller';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { MongoMemoryServer } from "mongodb-memory-server";
import { Connection, Model, connect } from 'mongoose';
import { User, UserSchema } from '../../../app/models/user.model';
import { MongoUsersDao } from '../users/classes/daos/mongo.dao';
import { IUserDao } from '../users/interfaces/IUser.interface';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/CreateUserDTO';


describe('UserController', () => {
    // let appController: AuthController;
    let authService: AuthService;

    let mongod: MongoMemoryServer;
    let mongoConnection: Connection;

    let userModel: Model<User>;

    let userDB = null;

    const body: CreateUserDto = {
        name: 'test',
        lastname: 'test',
        password: '123',
        email: 'test@gmail.com',
        role: 'regular',
        refresh_token: null
    };

    const loginBody = {
        username: 'testDB@gmail.com',
        password: '123',
    };

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoConnection = (await connect(uri)).connection;
        userModel = mongoConnection.model(User.name, UserSchema);

        const app: TestingModule = await Test.createTestingModule({
            // controllers: [AuthController],
            providers: [
                ConfigService,
                AuthService,
                UsersService,
                JwtService,
                { provide: IUserDao, useClass: MongoUsersDao },
                { provide: getModelToken(User.name), useValue: userModel },
            ],
        }).compile();

        authService = app.get<AuthService>(AuthService);

        userDB = await userModel.create({
            ...body,
            email: 'testDB@gmail.com',
        })
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

    describe('root', () => {
        it('should create a new user"', async () => {
            const result = await authService.signUp(body, 'regular');
            expect(result.email).toBe(body.email);
        });

        it('should obtain an error', async () => {
            const call =  async () => await authService.signUp({ ...body, email: 'testDB@gmail.com' }, 'regular');
            expect(call).rejects.toThrow();
        });

        it('should authenticate a user"', async () => {
            const result = await authService.login(loginBody);
            expect(typeof result.access_token).toBe('string');
        });
    });
});
