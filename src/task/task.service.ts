import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not, IsNull, LessThan } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { Cron } from '@nestjs/schedule';

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
        deletedAt: Not(IsNull()), // Check if deletedAt is not null
      },
      withDeleted: true, // Include soft-deleted records in the query
    });

    if (!task) {
      throw new NotFoundException(
        `Task with ID "${id}" not found or not deleted`,
      );
    }

    task.deletedAt = null; // Reset the deletedAt field to null to restore
    await this.taskRepository.save(task);

    return 'Task restored successfully';
  }

  // Permanently delete tasks that were soft-deleted more than 1 minute ago
  @Cron('*/1 * * * *') // Runs every minute
  async deleteOldSoftDeletedTasks() {
    const oneMinuteAgo = new Date(Date.now() - 60 * 1000); // Get the timestamp for 1 minute ago

    // Delete tasks where deletedAt is older than one minute ago
    const result = await this.taskRepository.delete({
      deletedAt: LessThan(oneMinuteAgo), // Tasks that have been soft-deleted for over 1 minute
    });

    if (result.affected) {
      console.log(`${result.affected} tasks permanently deleted.`);
    }
  }
}
