import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../../../models/user.model';
import { MongoUsersDao } from './mongo.dao';

// todo: ver import dinamico
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  providers: [MongoUsersDao],
  exports: [MongoUsersDao, MongooseModule]
})
export class DaosModule { }
