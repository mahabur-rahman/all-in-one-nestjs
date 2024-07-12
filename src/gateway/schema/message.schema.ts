import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatMessageDocument = ChatMessage & Document;

@Schema({
  timestamps: true,
})
export class ChatMessage {
  @Prop({ required: true })
  senderId: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  conversationId: string;

  @Prop({ required: true })
  recipientId: string; // Add recipientId to track user-to-user messages
}

export const ChatMessageSchema = SchemaFactory.createForClass(ChatMessage);
