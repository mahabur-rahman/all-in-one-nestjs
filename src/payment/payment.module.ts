import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentResolver } from './payment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentSchema } from './schema/create-payment.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  providers: [PaymentResolver, PaymentService],
})
export class PaymentModule {}
