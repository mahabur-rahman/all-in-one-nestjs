import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';
import { CreateLessonDto } from './dto/create-lesson.dto';

@Resolver()
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  // create lesson
  @Mutation(() => LessonType)
  async createLesson(
    @Args('createLessonDto') createLessonDto: CreateLessonDto,
  ) {
    return this.lessonService.createLesson(createLessonDto);
  }

  // get lesson using :id
  @Query(() => LessonType)
  getLessonById(@Args('id') id: string) {
    return this.lessonService.getLessonById(id);
  }

  // get all lessons
  @Query(() => [LessonType])
  getAllLessons() {
    return this.lessonService.getAllLessons();
  }

  // delete lesson
  @Mutation(() => LessonType)
  async deleteLesson(@Args('id') id: string) {
    return this.lessonService.deleteLesson(id);
  }
}
