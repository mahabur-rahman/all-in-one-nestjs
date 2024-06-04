import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
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
}

export const UserSchema = SchemaFactory.createForClass(User);
