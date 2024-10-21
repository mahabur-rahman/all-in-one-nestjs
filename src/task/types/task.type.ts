import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';

@ObjectType()
class TagType {
  @Field()
  name: string;

  @Field()
  color: string;
}

@ObjectType()
export class TaskType extends Task {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  completed: boolean;

  @Field(() => [TagType], { nullable: true })
  tags?: TagType[];
}
