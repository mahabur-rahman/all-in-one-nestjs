import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { GmailStatus } from '../schema/gmail.schema';

// Register enum for GraphQL
registerEnumType(GmailStatus, {
  name: 'GmailStatus',
});

@ObjectType()
export class GmailType {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => GmailStatus)
  status: GmailStatus;
}
