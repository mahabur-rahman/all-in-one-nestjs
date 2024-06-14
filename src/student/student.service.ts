import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schemas/student.schema';
import { v4 as uuid } from 'uuid';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<Student>,
  ) {}

  //   create a student
  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { firstName, lastName } = createStudentDto;

    const newStudent = await this.studentModel.create({
      id: uuid(),
      firstName,
      lastName,
    });
    return await newStudent.save();
  }
}
