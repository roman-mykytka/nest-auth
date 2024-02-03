import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`${__dirname}/../../../src/**/*.entity{.ts,.js}`],
  migrations: [`${__dirname}/../../../src/database/migrations/*{.ts,.js}`],
});
