import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CalendarDocument = Calendar & Document;

@Schema({
  timestamps: true,
})
export class Calendar {
  @Prop({ required: true })
  title: string;

  @Prop()
  desc?: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop({ default: false })
  allDay: boolean;

  @Prop({ required: false })
  url?: string;

  @Prop({ required: false })
  backgroundColor?: string;

  @Prop({ required: false })
  borderColor?: string;
}

export const CalendarSchema = SchemaFactory.createForClass(Calendar);
