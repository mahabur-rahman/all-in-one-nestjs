import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Prop({ enum: UserRole, default: UserRole.USER })
  role: UserRole;
}

// Create the schema factory
export const UserSchema = SchemaFactory.createForClass(User);
