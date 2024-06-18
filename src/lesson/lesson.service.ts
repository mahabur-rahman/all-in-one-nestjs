import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson, LessonStatus } from './schema/lesson.schema';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonType } from './types/lesson.type';

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
}
