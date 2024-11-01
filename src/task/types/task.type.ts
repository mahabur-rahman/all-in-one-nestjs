import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType() // Ensure this is here
export class TaskType {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;
}
