import { InputType, PartialType } from '@nestjs/graphql';
import { CreateStudentDto } from './create-student.dto';

@InputType()
export class UpdateStudentDto extends PartialType(CreateStudentDto) {}
