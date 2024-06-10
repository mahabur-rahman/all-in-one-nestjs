import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  userName: string;

  @Prop({ unique: [true, `Duplicate email entered!`] })
  email: string;

  @Prop()
  password: string;

  @Prop({ default: '' })
  bio: string;

  @Prop({ default: '' })
  profileImg: string;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'User' }] })
  following: User[];
}

export const UserSchema = SchemaFactory.createForClass(User);
