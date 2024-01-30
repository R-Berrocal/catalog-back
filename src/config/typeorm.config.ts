import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

const config: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true,
  migrationsTableName: 'migrations_typeorm',
};

export default config;
export const dataSource = new DataSource(config);
