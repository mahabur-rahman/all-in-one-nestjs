import { Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Student {
  id: string;

  firstName: string;

  lastName: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
