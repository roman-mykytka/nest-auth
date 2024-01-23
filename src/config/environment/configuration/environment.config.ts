import { NodeEnvironment } from '../enums/enums';

const environmentConfig = () => {
  return {
    app: {
      nodeEnv: process.env.NODE_ENV || NodeEnvironment.DEVELOPMENT,
      port: parseInt(process.env.PORT, 10) || 3000,
    },
    db: {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10) || 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      synchronize: true,
      entities: [__dirname + '/../../../modules/**/*.entity{.ts,.js}'],
      migrationsTableName: 'migration',
      migrations: [__dirname + '/../../../database/migrations/*{.ts,.js}'],
      logging: false,
    },
  };
};
export { environmentConfig };
