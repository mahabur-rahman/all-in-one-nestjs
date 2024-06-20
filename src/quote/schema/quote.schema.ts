import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Quote extends Document {
  @Prop()
  title: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  createBy: MongooseSchema.Types.ObjectId;
}

// Create the schema factory
export const QuoteSchema = SchemaFactory.createForClass(Quote);
