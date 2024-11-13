import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { TaskService } from './task.service';
import { TaskResolver } from './task.resolver';
import { Task } from './entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), ScheduleModule.forRoot()],
  providers: [TaskService, TaskResolver],
})
export class TaskModule {}
