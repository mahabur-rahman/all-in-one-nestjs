import { BadGatewayException, Injectable } from '@nestjs/common';
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
      return await this.chatMessageModel
        .find({ conversationId })
        // .populate('senderId', '-password')
        // .populate('recipientId', '-password')
        .exec();
    } catch (error) {
      console.error('Error retrieving messages by conversation:', error);
      throw new Error('Could not retrieve messages for the conversation');
    }
  }

  // delete message :messageId
  async deleteMessage(messageId: string): Promise<void> {
    try {
      await this.chatMessageModel.findByIdAndDelete(messageId).exec();
    } catch (error) {
      console.error('Error deleting message:', error);
      throw new Error('Could not delete the message');
    }
  }

  // edit message :messageId
  async editMessage(
    messageId: string,
    newContent: string,
  ): Promise<ChatMessage> {
    try {
      const updatedMessage = await this.chatMessageModel
        .findByIdAndUpdate(messageId, { content: newContent }, { new: true })
        .exec();
      return updatedMessage;
    } catch (error) {
      console.error('Error editing message:', error);
      throw new BadGatewayException('Could not edit the message');
    }
  }
}
