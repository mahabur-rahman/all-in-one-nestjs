import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// import { Task } from 'src/task/entities/task.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'root',
  database: 'taskmanagement',
  // entities: [Task],
  entities: [__dirname + '/../**/*.entity{.ts,.js}'], 
  synchronize: true,
};
