import { NodeEnvironment } from '../enums/enums';
import { Environment } from '@config/environment/types/types';
import { ValueOf } from '@core/types/value-of.type';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const environmentConfig = (): Environment => {
  return {
    app: {
      nodeEnv:
        (process.env.NODE_ENV as ValueOf<typeof NodeEnvironment>) ||
        NodeEnvironment.DEVELOPMENT,
      port: parseInt(process.env.PORT, 10) || 3000,
    },
    db: {
      type: process.env.DB_TYPE as PostgresConnectionOptions['type'],
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [__dirname + '/../../../modules/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: [__dirname + '/../../../database/migrations/*{.ts,.js}'],
      logging: true,
    },
    encrypt: {
      passwordSaltRounds:
        parseInt(process.env.USER_PASSWORD_SALT_ROUNDS, 10) || 3,
    },
    jwt: {
      access: {
        secretKey: process.env.JWT_ACCESS_SECRET,
        expiresIn: parseInt(process.env.JWT_ACCESS_EXPIRES_IN, 10),
      },
      refresh: {
        secretKey: process.env.JWT_REFRESH_SECRET,
        expiresIn: parseInt(process.env.JWT_REFRESH_EXPIRES_IN, 10),
      },
    },
  };
};
export { environmentConfig };
