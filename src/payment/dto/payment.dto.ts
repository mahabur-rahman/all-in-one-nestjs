import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PaymentDto {
  @Field()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @Field({ nullable: true })
  @IsNotEmpty({ message: 'Amount is required' })
  amount?: string;

  @Field()
  @IsNotEmpty({ message: 'Currency is required' })
  currency: string;

  @Field()
  @IsNotEmpty({ message: 'PostCode is required' })
  postCode: string;

  @Field()
  @IsNotEmpty({ message: 'Address is required' })
  address: string;

  @Field()
  @IsNotEmpty({ message: 'Phone is required' })
  phone: string;

  @Field()
  @IsNotEmpty({ message: 'ProductId is required' })
  productId: string;
}
