import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  // Create a new task
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(createTaskDto);
    return this.taskRepository.save(task);
  }

  // Find all tasks (including soft-deleted tasks)
  async findAllTask(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  // Soft delete a task (set deletedAt to current timestamp)
  async deleteTask(id: string): Promise<string> {
    const task = await this.taskRepository.findOne({ where: { id } });

    if (!task) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    // Set deletedAt to current date for soft delete
    task.deletedAt = new Date();
    await this.taskRepository.save(task);

    return 'Task deleted successfully';
  }

  // Restore a soft-deleted task (set deletedAt to null)
  async restoreTask(id: string): Promise<string> {
    const task = await this.taskRepository.findOne({
      where: {
        id,
        deletedAt: Not(null),
      },
    });

    if (!task) {
      throw new NotFoundException(
        `Task with ID "${id}" not found or not deleted`,
      );
    }

    task.deletedAt = null;
    await this.taskRepository.save(task);

    return 'Task restored successfully';
  }
}
