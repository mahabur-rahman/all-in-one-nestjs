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

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  likes: User[];

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: [],
  })
  dislikes: User[];

  @Prop({
    type: [String],
    default: [],
  })
  images: string[];

  @Prop({
    type: [String],
    default: [],
  })
  videos: string[];

  @Prop({
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  })
  rating: number;

  // Added Extra Things
  @Prop({
    type: {
      average: { type: Number, required: true, default: 0 },
      count: { type: Number, required: true, default: 0 },
    },
    _id: false,
  })
  ratings: Record<string, any>;

  @Prop({
    type: String,
    required: true,
    enum: ['English', 'Spanish', 'French', 'German', 'Other'],
  })
  languages: string;

  @Prop({
    type: [String],
    default: [],
  })
  features: string[];

  @Prop({
    type: [String],
    default: [],
  })
  topics: string[];

  @Prop({
    type: String,
    enum: ['Beginner', 'Intermediate', 'Advanced'],
  })
  level: string;

  @Prop({
    type: String,
    enum: ['Free', 'Paid'],
    required: true,
  })
  price: string;

  @Prop({
    type: String,
    enum: ['0-1 hour', '1-3 hours', '3-6 hours', '6+ hours'],
    required: true,
  })
  duration: string;
}

// Create the schema factory
export const QuoteSchema = SchemaFactory.createForClass(Quote);
