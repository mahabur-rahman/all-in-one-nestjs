import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './schema/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskType } from './types/task.type';
import { UpdateTaskDto } from './dto/update.task.dto';

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

  //   find all task
  // Get all tasks
  async findAll(): Promise<TaskType[]> {
    const tasks = await this.taskModel.find().exec(); // Fetch all tasks from the database
    return tasks.map((task) => ({
      id: task._id.toString(), // Convert ObjectId to string
      title: task.title,
    }));
  }

  // Get a single task by ID
  async findById(id: string): Promise<TaskType> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return {
      id: task._id.toString(),
      title: task.title,
    };
  }

  // Update a task by ID
  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<TaskType> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, updateTaskDto, { new: true })
      .exec();
    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return {
      id: updatedTask._id.toString(),
      title: updatedTask.title,
    };
  }

  // Delete a task by ID
  async delete(id: string): Promise<TaskType> {
    const deletedTask = await this.taskModel.findByIdAndDelete(id).exec();
    if (!deletedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return {
      id: deletedTask._id.toString(),
      title: deletedTask.title,
    };
  }
}
