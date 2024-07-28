import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnModuleInit } from '@nestjs/common';
import { Server } from 'socket.io';
import { GatewayService } from './gateway.service';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class MyGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly gatewayService: GatewayService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);

      socket.on('disconnect', () => {
        console.log(`----Client disconnected----: ${socket.id}`);
      });
    });
  }

  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    @MessageBody()
    message: {
      senderId: string;
      content: string;
      recipientId: string;
    },
  ): Promise<void> {
    const conversationId = this.generateConversationId(
      message.senderId,
      message.recipientId,
    );
    const savedMessage = await this.gatewayService.saveMessage(
      message.senderId,
      message.content,
      conversationId,
      message.recipientId,
    );
    this.server.emit('chatMessage', savedMessage);
  }

  @SubscribeMessage('getMessages')
  async handleGetMessages(
    @MessageBody()
    data: {
      senderId: string;
      recipientId: string;
    },
  ): Promise<void> {
    const conversationId = this.generateConversationId(
      data.senderId,
      data.recipientId,
    );
    const messages =
      await this.gatewayService.findMessagesByConversation(conversationId);
    this.server.emit('allMessages', messages);
  }

  // delete message :messageId
  @SubscribeMessage('deleteMessage')
  async handleDeleteMessage(@MessageBody() messageId: string): Promise<void> {
    await this.gatewayService.deleteMessage(messageId);
    this.server.emit('messageDeleted', messageId);
  }

  // edit message :messageId
  @SubscribeMessage('editMessage')
  async handleEditMessage(
    @MessageBody()
    data: {
      messageId: string;
      newContent: string;
    },
  ): Promise<void> {
    try {
      const updatedMessage = await this.gatewayService.editMessage(
        data.messageId,
        data.newContent,
      );
      this.server.emit('messageEdited', updatedMessage);
    } catch (error) {
      console.error('Error handling editMessage:', error);
      this.server.emit('error', { error: 'Could not edit message' });
    }
  }

  // generated conversationId
  private generateConversationId(userId1: string, userId2: string): string {
    const sortedIds = [userId1, userId2].sort();
    return `${sortedIds[0]}_${sortedIds[1]}`;
  }
}
