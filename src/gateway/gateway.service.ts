import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from './schema/message.schema';

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(ChatMessage.name)
    private chatMessageModel: Model<ChatMessageDocument>,
  ) {}

  async saveMessage(
    senderId: string,
    content: string,
    conversationId: string,
    recipientId: string,
  ): Promise<ChatMessage> {
    const newMessage = new this.chatMessageModel({
      senderId,
      content,
      conversationId,
      recipientId,
    });
    return await newMessage.save();
  }

  async findMessagesByConversation(
    conversationId: string,
  ): Promise<ChatMessage[]> {
    try {
      return await this.chatMessageModel.find({ conversationId }).exec();
    } catch (error) {
      console.error('Error retrieving messages by conversation:', error);
      throw new Error('Could not retrieve messages for the conversation');
    }
  }
}
