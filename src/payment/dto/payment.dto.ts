import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PaymentDto {
  @Field()
  @IsNotEmpty({ message: `name is required` })
  name: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: `amount is required` })
  amount?: string;

  @Field()
  @IsNotEmpty({ message: `currency is required` })
  currency: string;

  @Field()
  @IsNotEmpty({ message: `postCode is required` })
  postCode: string;

  @Field()
  @IsNotEmpty({ message: `address is required` })
  address: string;

  @Field()
  @IsNotEmpty({ message: `phone is required` })
  phone: string;

  @Field()
  @IsNotEmpty({ message: `ProductId is required` })
  productId: string;
}
