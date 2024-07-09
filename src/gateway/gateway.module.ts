import { Module } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { MyGateway } from './gateway.gateway';

@Module({
  providers: [MyGateway, GatewayService],
})
export class GatewayModule {}
