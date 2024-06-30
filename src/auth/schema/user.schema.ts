import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Quote } from 'src/quote/schema/quote.schema';

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
}

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ unique: [true, `Duplicate email entered.`] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  image?: string;

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Prop({ unique: true })
  googleId: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quote' }] })
  quotes: Quote[];
}

// Create the schema factory
export const UserSchema = SchemaFactory.createForClass(User);
