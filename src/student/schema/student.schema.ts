import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

@Schema({
  timestamps: true,
})
export class Student extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop()
  grade: string;

  @Prop()
  addresses: string;

  @Prop({ enum: Gender, required: true })
  gender: Gender;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
