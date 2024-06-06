import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Schema({
  timestamps: true,
})
export class Article {
  @Prop()
  slug: string;

  @Prop()
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  body: string;

  @Prop()
  tagList: string[];

  @Prop({ default: 0 })
  favoritesCount: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  author: User;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
