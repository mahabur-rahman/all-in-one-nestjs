import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskType } from './types/task.type';

@Resolver(() => TaskType)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Mutation(() => TaskType)
  async createTask(
    @Args('createTaskInput') createTaskDto: CreateTaskDto,
  ): Promise<TaskType> {
    return this.taskService.createTask(createTaskDto);
  }

  @Query(() => [TaskType]) // Return an array of TaskType
  async findAllTask(): Promise<TaskType[]> {
    return this.taskService.findAllTask();
  }
}
