import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  // created task
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description, tags } = createTaskDto;
    const task = this.taskRepository.create({
      title,
      description,
      completed: false,
      tags,
    });

    await this.taskRepository.save(task);
    return task;
  }
}
