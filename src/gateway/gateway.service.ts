import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChatMessage, ChatMessageDocument } from './schema/message.schema';
import { v4 as uuidv4 } from 'uuid'; // Import only v4 from uuid

@Injectable()
export class GatewayService {
  constructor(
    @InjectModel(ChatMessage.name)
    private chatMessageModel: Model<ChatMessageDocument>,
  ) {}

  async saveMessage(content: string): Promise<ChatMessage> {
    const senderId = uuidv4();
    const newMessage = new this.chatMessageModel({ senderId, content });
    return await newMessage.save();
  }

  async findAllMessages(): Promise<ChatMessage[]> {
    return await this.chatMessageModel.find().exec();
  }
}
