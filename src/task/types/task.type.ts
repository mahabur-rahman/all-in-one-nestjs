import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Task } from '../entities/task.entity';

@ObjectType()
export class TaskType extends Task {
  @Field((type) => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  completed: boolean;
}
