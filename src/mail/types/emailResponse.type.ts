// emailResponse.type.ts

import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class EmailResponse {
  @Field()
  success: boolean;
}
