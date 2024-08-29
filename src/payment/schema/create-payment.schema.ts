import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class Payment {
  @Prop({ required: true })
  name: string;

  @Prop()
  amount: string;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  postCode: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: true })
  productId: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
