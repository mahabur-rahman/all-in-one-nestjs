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
  ): Promise<ChatMessage> {
    const newMessage = new this.chatMessageModel({
      senderId,
      content,
      conversationId,
    });
    return await newMessage.save();
  }

  async findAllMessages(): Promise<ChatMessage[]> {
    return await this.chatMessageModel.find().exec();
  }
}
