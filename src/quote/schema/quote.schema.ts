import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

import { User } from 'src/auth/schema/user.schema';

@Schema({
  timestamps: true,
})
export class Quote {
  @Prop()
  title: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createBy: User;
}

// Create the schema factory
export const QuoteSchema = SchemaFactory.createForClass(Quote);
