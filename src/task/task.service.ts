import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.tags = createTaskDto.tags;

    // Find the user by ID and associate with the task
    const user = await this.userRepository.findOne({
      where: { id: createTaskDto.userId }, // Use the where option
    });

    if (!user) {
      throw new Error('User not found');
    }
    task.user = user; // Associate user with task

    return this.taskRepository.save(task); // Save the task
  }
}
