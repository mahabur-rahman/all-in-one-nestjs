import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop()
  name: string;
}

// Create the schema factory
export const TaskSchema = SchemaFactory.createForClass(Task);