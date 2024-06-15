import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Lesson {
  @Prop()
  id: string;

  @Prop()
  name: string;

  @Prop()
  startDate: string;

  @Prop()
  endDate: string;
}

export const LessonSchema = SchemaFactory.createForClass(Lesson);
