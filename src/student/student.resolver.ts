import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './types/student.type';
import { CreateStudentDto } from './dto/create-student.dto';

@Resolver()
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  // create a student
  @Mutation(() => StudentType)
  studentCreate(
    @Args('createStudentInput') createStudentInput: CreateStudentDto,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}
