import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Student {
  @Prop()
  id: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
