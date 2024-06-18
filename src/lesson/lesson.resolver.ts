import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { AssignStudentsToLessonDto } from './dto/assign-studentTo-lesson.dto';

@Resolver(() => LessonType)
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
  async getLessonById(@Args('id') id: string): Promise<LessonType> {
    return this.lessonService.getLessonById(id);
  }

  // get all lessons
  @Query(() => [LessonType])
  async getAllLessons(): Promise<LessonType[]> {
    return this.lessonService.getAllLessons();
  }

  // delete lesson :id ]
  @Mutation(() => LessonType)
  async deleteLesson(@Args('id') id: string): Promise<LessonType> {
    return this.lessonService.deleteLesson(id);
  }

  // update lesson :id
  @Mutation(() => LessonType)
  async updateLesson(
    @Args('id') id: string,
    @Args('updateLesson') updateLessonDto: UpdateLessonDto,
  ): Promise<LessonType> {
    return this.lessonService.updateLesson(id, updateLessonDto);
  }

  // assign students to lesson
  @Mutation(() => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsToLesson')
    assignStudentsToLessonDto: AssignStudentsToLessonDto,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonDto;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }
}
