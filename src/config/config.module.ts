import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configurations } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
        envFilePath: `.env_${process.env.NODE_ENV}`,
        load: [...configurations],
        isGlobal: true,
      }),
  ],
})
export class ConfigsModule {}