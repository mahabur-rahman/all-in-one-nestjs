import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskType } from './types/task.type';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  // Create a new task
  async create(createTaskDto: CreateTaskDto): Promise<TaskType> {
    const newTask = new this.taskModel(createTaskDto);
    const savedTask = await newTask.save(); // Save the task

    // Map savedTask to TaskType
    return {
      id: savedTask._id.toString(), // Convert ObjectId to string
      title: savedTask.title,
    };
  }
}
