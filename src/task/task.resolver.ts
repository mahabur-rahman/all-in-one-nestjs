import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { TaskType } from './types/task.type';

@Resolver((of) => TaskType)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation((returns) => TaskType)
  async createTask(
    @Args('createTaskInput') createTaskDto: CreateTaskDto,
  ): Promise<TaskType> {
    return this.taskService.createTask(createTaskDto);
  }

  // get all task
  @Query((returns) => [TaskType])
  async getAllTasks(): Promise<TaskType[]> {
    return this.taskService.getAllTasks();
  }
}
