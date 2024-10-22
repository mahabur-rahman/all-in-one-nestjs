import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role, User } from '../entities/user.entity';
import { TaskType } from 'src/task/types/task.type';

@ObjectType()
export class UserType extends User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  isActive: boolean;

  @Field(() => Role)
  role: Role;

  @Field(() => [TaskType], { nullable: true })
  tasks: TaskType[];
}
