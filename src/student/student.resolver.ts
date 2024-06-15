import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './types/student.type';
import { CreateStudentDto } from './dto/create-student.dto';

@Resolver()
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  // create a student
  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentDto') createStudentDto: CreateStudentDto,
  ) {
    return this.studentService.createStudent(createStudentDto);
  }

  // get all students
  @Query(() => [StudentType])
  async getAllStudents() {
    return this.studentService.getAllStudents();
  }

  // get single student :id
  @Query(() => StudentType)
  async getStudentById(@Args('id') id: string) {
    return this.studentService.getStudentById(id);
  }

  // delete student :id
  @Mutation(() => StudentType)
  async deleteStudent(@Args('id') id: string) {
    return this.studentService.deleteStudent(id);
  }
}
