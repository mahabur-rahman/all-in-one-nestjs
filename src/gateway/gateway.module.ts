import { Module } from '@nestjs/common';
import { MyGateway } from './gateway.gateway';
import { GatewayService } from './gateway.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatMessage, ChatMessageSchema } from './schema/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChatMessage.name, schema: ChatMessageSchema },
    ]),
  ],
  providers: [MyGateway, GatewayService],
  exports: [MyGateway], // Ensure MyGateway is exported if needed in other modules
})
export class GatewayModule {}
