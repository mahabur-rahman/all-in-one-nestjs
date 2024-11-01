import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop()
  title: string;
}

// Create the schema factory
export const TaskSchema = SchemaFactory.createForClass(Task);
