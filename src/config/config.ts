import { registerAs } from '@nestjs/config';

export enum ConfigKey {
  App = 'APP',
  Db = 'DB',
}

export enum Environment {
  Local = 'local',
  Development = 'development',
  Staging = 'staging',
  Production = 'prod',
  Testing = 'testing',
}

const APPConfig = registerAs(
  ConfigKey.App, () => ({
    env:
      Environment[process.env.NODE_ENV as keyof typeof Environment] ||
      'development',
    port: Number(process.env.APP_PORT),
    jwtTokenSecret: process.env.JWT_TOKEN_SECRET,
    jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
    appName: process.env.APP_NAME,
  }),
);

const DBConfig = registerAs(
  ConfigKey.Db, () => ({
    mongoUri: process.env.MONGO_URI,
  }),
);

export const configurations = [APPConfig, DBConfig];