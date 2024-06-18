import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonResolver } from './lesson.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Lesson, LessonSchema } from './schema/lesson.schema';
import { StudentModule } from 'src/student/student.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Lesson.name, schema: LessonSchema }]),
    StudentModule,
  ],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
