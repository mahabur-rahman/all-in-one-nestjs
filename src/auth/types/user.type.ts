import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { UserRole } from '../schema/user.schema';
import { QuoteType } from 'src/quote/types/quote.type';

// Register the enum type for graphql
registerEnumType(UserRole, {
  name: 'UserRole',
});

@ObjectType('User')
export class UserType {
  @Field(() => ID)
  _id?: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field(() => UserRole, { nullable: true })
  role?: UserRole;

  @Field({ nullable: true })
  image: string;

  @Field(() => [QuoteType])
  quotes: QuoteType[];
}
