import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ChatMessageDocument = ChatMessage & Document;

@Schema({
  timestamps: true,
})
export class ChatMessage {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  senderId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  conversationId: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recipientId: string;
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
