import { Module } from '@nestjs/common';
import { DaosModule } from './classes/daos/daos.module';
import { MongoUsersDao } from './classes/daos/mongo.dao';
import { IUserDao } from './interfaces/IUser.interface';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [DaosModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: IUserDao,
      useClass: MongoUsersDao
    },
  ],
  exports: [UsersService]
})
export class UsersModule { }
