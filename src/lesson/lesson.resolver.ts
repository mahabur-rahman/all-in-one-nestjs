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
import { AssignStudentsToLessonDto } from './types/assign-studentsTo-lesson.dto';
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

  // assign student to lesson
  @Mutation(() => LessonType)
  assignStudentToLesson(
    @Args('assignStudentToLessonDto')
    assignStudentToLessonDto: AssignStudentsToLessonDto,
  ) {
    const { lessonId, studentIds } = assignStudentToLessonDto;

    return this.lessonService.assignStudentToLesson(lessonId, studentIds);
  }

  // when i create lesson resolve also students and access to student properties
  @ResolveField()
  async students(@Parent() lesson: Lesson) {
    return this.studentService.getManyStudentProperties(lesson.students);
  }
}
