import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { StudentService } from './student.service';
import { StudentType } from './types/student.type';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  // create a student
  @Mutation(() => StudentType)
  async createStudent(
    @Args('createStudentDto') createStudentDto: CreateStudentDto,
  ): Promise<StudentType> {
    return this.studentService.createStudent(createStudentDto);
  }

  // get all students
  @Query(() => [StudentType])
  async getStudents(): Promise<StudentType[]> {
    return this.studentService.getStudents();
  }

  // get student :id
  @Query(() => StudentType)
  async getStudent(@Args('id') id: string): Promise<StudentType> {
    return this.studentService.getStudent(id);
  }

  // update student :id
  @Mutation(() => StudentType)
  async updateStudent(
    @Args('id') id: string,
    @Args('updateStudentDto') updateStudentDto: UpdateStudentDto,
  ): Promise<StudentType> {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  // delete student :id
  @Mutation(() => StudentType)
  async deleteStudent(@Args('id') id: string): Promise<StudentType> {
    return this.studentService.deleteStudent(id);
  }
}
