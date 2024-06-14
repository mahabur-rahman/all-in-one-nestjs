import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Lesson } from './schemas/lesson.schema';
import { v4 as uuid } from 'uuid';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<Lesson>,
  ) {}

  //   create lesson
  async createLesson(createLessonInput: CreateLessonDto): Promise<Lesson> {
    const { name, startDate, endDate } = createLessonInput;
    const newLesson = await this.lessonModel.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });

    return await newLesson.save();
  }

  //   get single lesson using id
  async getLessonById(id: string): Promise<Lesson> {
    let lesson: Lesson | null;

    if (isValidObjectId(id)) {
      lesson = await this.lessonModel.findById({ _id: id });
    } else {
      lesson = await this.lessonModel.findOne({ id });
    }
    if (!lesson) {
      throw new NotFoundException(`Lesson ${id} not found`);
    }

    return lesson;
  }

  //   get all lessons
  async getAllLessons(): Promise<Lesson[]> {
    return await this.lessonModel.find();
  }
}
