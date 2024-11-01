import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskType } from './types/task.type';
import { UpdateTaskDto } from './dto/update.task.dto';

@Resolver(() => TaskType)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // Mutation to create a new task
  @Mutation(() => TaskType)
  async createTask(
    @Args('createTaskInput') createTaskDto: CreateTaskDto,
  ): Promise<TaskType> {
    return await this.taskService.create(createTaskDto);
  }

  // Query to get all tasks
  @Query(() => [TaskType])
  async getAllTasks(): Promise<TaskType[]> {
    return await this.taskService.findAll();
  }

  // Query to get a single task by ID
  @Query(() => TaskType)
  async getTaskById(@Args('id') id: string): Promise<TaskType> {
    return await this.taskService.findById(id);
  }

  // Mutation to update a task by ID
  @Mutation(() => TaskType)
  async updateTask(
    @Args('id') id: string,
    @Args('updateTaskInput') updateTaskDto: UpdateTaskDto,
  ): Promise<TaskType> {
    return await this.taskService.update(id, updateTaskDto);
  }

  // Mutation to delete a task by ID
  @Mutation(() => TaskType)
  async deleteTask(@Args('id') id: string): Promise<TaskType> {
    return await this.taskService.delete(id);
  }
}
