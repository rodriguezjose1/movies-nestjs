import { Test, TestingModule } from '@nestjs/testing';
// import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUserDTO';
import { Connection, Model, connect } from 'mongoose';
import { MongoMemoryServer } from "mongodb-memory-server";
import { User, UserSchema } from '../../../app/models/user.model';
import { getModelToken } from '@nestjs/mongoose';
import { IUserDao } from './interfaces/IUser.interface';
import { MongoUsersDao } from './classes/daos/mongo.dao';

describe('UserController', () => {
    // let appController: UsersController;
    let usersService: UsersService;

    let mongod: MongoMemoryServer;
    let mongoConnection: Connection;

    let userModel: Model<User>;

    const body: CreateUserDto = {
        name: 'test',
        lastname: 'test',
        password: '123',
        email: 'test@gmail.com',
        role: 'regular'

    };

    beforeAll(async () => {
        mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoConnection = (await connect(uri)).connection;
        userModel = mongoConnection.model(User.name, UserSchema);

        const app: TestingModule = await Test.createTestingModule({
            // controllers: [UsersController],
            providers: [
                UsersService,
                { provide: getModelToken(User.name), useValue: userModel },
                { provide: IUserDao, useClass: MongoUsersDao },
            ],
        }).compile();

        usersService = app.get<UsersService>(UsersService);
    });

    afterAll(async () => {
        // await mongoConnection.dropDatabase();
        await mongoConnection.close();
        await mongod.stop();
    });

    afterEach(async () => {
        // const collections = mongoConnection.collections;
        // for (const key in collections) {
        //     const collection = collections[key];
        //     await collection.deleteMany({});
        // }
    });

    describe('root', () => {
        it('should create a new user"', async () => {
            const result = await usersService.create(body);
            expect(result.email).toBe(body.email);
        });
        
        it('should obtain a user by id"', async () => {
            let result = await usersService.create(body);

            const id = result.id.toString();
            result = await usersService.getById(id);

            expect(result.id.toString()).toBe(id);
        });
    });
});
