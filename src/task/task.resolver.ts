import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { TaskType } from './types/task.type';
import { UpdateTaskDto } from './dto/update-task.dto';

@Resolver(() => TaskType)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  // Create task mutation
  @Mutation(() => TaskType)
  async createTask(
    @Args('createTaskInput') createTaskDto: CreateTaskDto,
  ): Promise<TaskType> {
    return this.taskService.createTask(createTaskDto);
  }

  // Get all tasks query
  @Query(() => [TaskType])
  async getAllTasks(): Promise<TaskType[]> {
    return this.taskService.getAllTasks();
  }

  // Update task mutation
  @Mutation(() => TaskType)
  async updateTask(
    @Args('id') id: string, // ID of the task to update
    @Args('updateTaskInput') updateTaskDto: UpdateTaskDto, // Use a separate DTO for updates
  ): Promise<TaskType> {
    return this.taskService.updateTask(id, updateTaskDto); // Call the service to update the task
  }

  // Delete task mutation
  @Mutation((returns) => Boolean)
  async deleteTask(@Args('id') id: string): Promise<boolean> {
    return this.taskService.deleteTask(id);
  }
}
