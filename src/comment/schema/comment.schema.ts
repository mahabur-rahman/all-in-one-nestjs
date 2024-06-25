import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';
import { Quote } from 'src/quote/schema/quote.schema';

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop()
  content: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  commentedBy: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quote' }],
    default: [],
  })
  quoteRef: Quote;
}

// Create the schema factory
export const CommentSchema = SchemaFactory.createForClass(Comment);
