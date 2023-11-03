import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './app/modules/users/users.module';
import { ConfigsModule } from './config/config.module';
import { MongooseConfigModule } from './database/mongo/mongo.module';
import mongoose from 'mongoose';
import { AuthModule } from './app/modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { MoviesModule } from './app/modules/movies/movies.module';

mongoose.set('debug', true);

@Module({
  imports: [
    ConfigsModule,
    MongooseConfigModule,
    AuthModule,
    UsersModule,
    MoviesModule,
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
  }
  ],
})
export class AppModule { }
