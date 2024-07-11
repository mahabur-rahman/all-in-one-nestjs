import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { OnModuleInit, UseGuards } from '@nestjs/common';
import { Server } from 'socket.io';
import { GatewayService } from './gateway.service';
import { JwtGuard } from 'src/auth/utils/jwt.guard';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'], // Replace with your client URL
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
  @UseGuards(JwtGuard)
  async handleChatMessage(
    @MessageBody() message: { senderId: string; content: string },
  ): Promise<void> {
    const savedMessage = await this.gatewayService.saveMessage(
      message.senderId,
      message.content,
    );
    this.server.emit('chatMessage', savedMessage);
  }
}
