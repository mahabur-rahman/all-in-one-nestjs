import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonStatus } from './schema/lesson.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonType } from './types/lesson.type';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<Lesson>,
  ) {}

  //   create lesson
  async createLesson(createLessonDto: CreateLessonDto): Promise<LessonType> {
    const {
      lessonName,
      description,
      instructor,
      startDate,
      endDate,
      duration,
      status,
    } = createLessonDto;

    const newLesson = new this.lessonModel({
      lessonName,
      description,
      instructor,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      duration,
      status: status || LessonStatus.ONGOING, // Default to LessonStatus.ONGOING if status is not provided
    });

    const savedLesson = await newLesson.save();

    return savedLesson.toObject() as LessonType;
  }

  //   get lesson using :id
  async getLessonById(id: string): Promise<LessonType> {
    const lesson = await this.lessonModel.findById(id).exec();

    return lesson.toObject() as LessonType;
  }

  //   get all lessons
  async getAllLessons(): Promise<LessonType[]> {
    const lessons = await this.lessonModel.find().exec();

    return lessons.map((lesson) => lesson.toObject() as LessonType);
  }

  //   delete lesson :id
  async deleteLesson(id: string): Promise<LessonType> {
    const deletedLesson = await this.lessonModel.findByIdAndDelete(id).exec();

    return deletedLesson.toObject() as LessonType;
  }

  //   update lesson :id
  async updateLesson(
    id: string,
    updateLessonDto: UpdateLessonDto,
  ): Promise<LessonType> {
    const lesson = await this.lessonModel.findById(id).exec();

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }

    // Update lesson fields if they are provided in the updateLessonDto
    Object.assign(lesson, updateLessonDto);

    const updatedLesson = await lesson.save();

    return updatedLesson.toObject() as LessonType;
  }
}
