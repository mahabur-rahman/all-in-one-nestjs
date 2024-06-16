import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { v4 as uuid } from 'uuid';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student } from './schemas/student.schema';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<Student>,
  ) {}

  // create a student
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

  //   get single student :id
  async getStudentById(id: string): Promise<Student> {
    return await this.studentModel.findById(id).exec();
  }

  //   delete student :id
  async deleteStudent(id: string): Promise<Student> {
    const student = await this.studentModel
      .findByIdAndDelete({ _id: id })
      .exec();
    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }
    return student;
  }

  // update student :id
  async updateStudent(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const { firstName, lastName } = updateStudentDto;

    const student = await this.studentModel.findByIdAndUpdate(
      { _id: id },
      { firstName, lastName },
      { new: true },
    );

    if (!student) {
      throw new NotFoundException(`Student with id ${id} not found`);
    }

    return student;
  }

  // After pushing students id in lesson when i create lesson resolve also students and access to student properties
  async getManyStudentProperties(studentIds: string[]): Promise<Student[]> {
    return await this.studentModel.find({ id: { $in: studentIds } }).exec();
  }
}
