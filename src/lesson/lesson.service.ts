import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Lesson } from './schema/lesson.schema';
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
  async createLesson(createLessonDto: CreateLessonDto): Promise<Lesson> {
    const {
      lessonName,
      startDate,
      endDate,
      instructor,
      status,
      description,
      duration,
      students,
    } = createLessonDto;

    const newLesson = await this.lessonModel.create({
      lessonName,
      startDate,
      endDate,
      instructor,
      status,
      description,
      duration,
      students,
    });

    return await newLesson.save();
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

  // assign students to lesson
  async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<LessonType> {
    const lesson = await this.lessonModel.findById(lessonId).exec();

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${lessonId} not found`);
    }

    lesson.students = [...lesson.students, ...studentIds];
    const updatedLesson = await lesson.save();
    return updatedLesson.toObject() as LessonType;
  }
}
