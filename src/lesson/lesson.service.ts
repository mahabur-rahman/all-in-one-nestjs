import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson } from './schemas/lesson.schema';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Injectable()
export class LessonService {
  constructor(
    @InjectModel(Lesson.name)
    private readonly lessonModel: Model<Lesson>,
  ) {}

  //   create lesson
  async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonDto;

    const newLesson = await this.lessonModel.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students
    });

    return await newLesson.save();
  }

  //   get lesson by :id
  getLessonById(id: string): Promise<Lesson> {
    return this.lessonModel.findById({ _id: id });
  }

  //   get all lessons
  async getAllLessons(): Promise<Lesson[]> {
    return await this.lessonModel.find();
  }

  //   delete lesson
  async deleteLesson(id: string): Promise<Lesson> {
    return await this.lessonModel.findByIdAndDelete({ _id: id });
  }

  // assign students to lesson
  async assignStudentsToLesson(
    lessonId: string,
    studentsIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.lessonModel.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentsIds];

    return await lesson.save();
  }
}
