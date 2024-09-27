import { registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum GmailStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
}

// register enum for graphql
registerEnumType(GmailStatus, {
  name: 'GmailStatus',
});

@Schema({
  timestamps: true,
})
export class Gmail extends Document {
  @Prop({
    unique: [true, `Duplicate email entered!`],
  })
  email: string;

  @Prop()
  password: string;

  @Prop({ enum: GmailStatus, default: GmailStatus.PENDING })
  status: GmailStatus;
}

export const GmailSchema = SchemaFactory.createForClass(Gmail);
