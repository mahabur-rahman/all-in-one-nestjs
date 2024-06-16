import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { AssignStudentsToLessonDto } from './dto/assign-studentsTo-lesson.dto';
import { Lesson } from './schemas/lesson.schema';
import { StudentService } from '../student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private readonly lessonService: LessonService,
    private readonly studentService: StudentService,
  ) {}

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

  // assign students to lesson
  @Mutation(() => LessonType)
  async assignStudentsToLesson(
    @Args('assignStudentsToLesson')
    assignStudentsToLessonDto: AssignStudentsToLessonDto,
  ) {
    const { lessonId, studentIds } = assignStudentsToLessonDto;
    return this.lessonService.assignStudentsToLesson(lessonId, studentIds);
  }

  // when i create lesson resolve also students and access all students properties
  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudentProperties(lesson.students);
  }
}
