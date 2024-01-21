import { NodeEnvironment } from '../enums/enums';
import * as process from 'process';

const environmentConfiguration = () => ({
  app: {
    nodeEnv: process.env.NODE_ENV || NodeEnvironment.DEVELOPMENT,
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  db: {
    type: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
export { environmentConfiguration };
