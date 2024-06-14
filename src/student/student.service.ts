import { Injectable, NotFoundException } from '@nestjs/common';
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

  //   get all students
  async getAllStudents(): Promise<Student[]> {
    return await this.studentModel.find().exec();
  }

  //   get student by id
  async getStudentById(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) {
      throw new NotFoundException(`Student ${id} not found`);
    }

    return student;
  }
}
