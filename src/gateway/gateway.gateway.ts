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
    origin: ['http://localhost:5000'], // Replace with your client URL
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
        console.log(`Client disconnected: ${socket.id}`);
      });
    });
  }

  @SubscribeMessage('chatMessage')
  async handleChatMessage(
    @MessageBody() message: { content: string },
  ): Promise<void> {
    const savedMessage = await this.gatewayService.saveMessage(message.content);
    this.server.emit('chatMessage', savedMessage);
  }

  // find all message

  @SubscribeMessage('getAllMessages')
  async handleGetAllMessages(@MessageBody() data: any): Promise<void> {
    console.log(`Data from server: `, data);
    const allMessages = await this.gatewayService.findAllMessages();
    this.server.emit('allMessages', allMessages);
  }
}
