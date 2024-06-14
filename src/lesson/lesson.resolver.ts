import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  // create lesson
  @Mutation(() => LessonType)
  lessonCreate(@Args('createLessonDto') createLessonInput: CreateLessonDto) {
    return this.lessonService.createLesson(createLessonInput);
  }

  // get single lesson using mongoId
  @Query(() => LessonType)
  getLessonById(@Args('id') id: string) {
    return this.lessonService.getLessonById(id);
  }

  // get all lesson 
  @Query(() => [LessonType])
  getLessons() {
    return this.lessonService.getAllLessons();
  }
}
