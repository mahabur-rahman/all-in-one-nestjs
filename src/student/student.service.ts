import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student } from './schema/student.schema';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name)
    private readonly studentModel: Model<Student>,
  ) {}

  //   create a student
  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const { name, age, grade, addresses, gender } = createStudentDto;

    const newStudent = new this.studentModel({
      name,
      age,
      grade,
      addresses,
      gender,
    });

    const savedStudent = await newStudent.save();
    return savedStudent;
  }

  //   get all students
  async getStudents(): Promise<Student[]> {
    const students = await this.studentModel.find().exec();
    return students;
  }

  // get student :id
  async getStudent(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    return student;
  }

  //   update student :id
  async updateStudent(
    id: string,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const { name, age, grade, addresses, gender } = updateStudentDto;

    const updatedStudent = await this.studentModel.findByIdAndUpdate(
      id,
      {
        name,
        age,
        grade,
        addresses,
        gender,
      },
      { new: true },
    );
    return updatedStudent;
  }

  //   delete student :id
  async deleteStudent(id: string): Promise<Student> {
    const deletedStudent = await this.studentModel.findByIdAndDelete(id).exec();
    return deletedStudent;
  }
}
