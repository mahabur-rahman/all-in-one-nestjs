import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum LessonStatus {
  PLANNED = 'PLANNED',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
}

@Schema({
  timestamps: true,
})
export class Lesson extends Document {
  @Prop()
  lessonName: string;

  @Prop()
  description: string;

  @Prop()
  instructor: string;

  @Prop()
  startDate: Date;

  @Prop()
  duration: number; // duration in minutes

  @Prop()
  endDate: Date;

  @Prop({ enum: LessonStatus, default: LessonStatus.ONGOING })
  status: LessonStatus;

  @Prop()
  students: string[];
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
