import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'mongodb',
  host: 'localhost',
  port: 27017,
  database: 'db-migrations',
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/db/migrations/*.js'],
  synchronize: true, // Enables schema synchronization
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
