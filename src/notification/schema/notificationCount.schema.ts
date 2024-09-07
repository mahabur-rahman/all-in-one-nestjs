import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class NotificationCount extends Document {
  @Prop({ default: 0 })
  count: number;
}

export const NotificationCountSchema =
  SchemaFactory.createForClass(NotificationCount);
