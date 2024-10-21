import { Injectable, NotFoundException } from '@nestjs/common';
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

  // get all task

  // Get all tasks
  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  // Update task
  async updateTask(
    id: string,
    updateTaskDto: Partial<CreateTaskDto>,
  ): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    Object.assign(task, updateTaskDto);

    await this.taskRepository.save(task);
    return task;
  }
}
