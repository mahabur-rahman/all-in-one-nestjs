import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Gender } from '../schema/student.schema';

@ObjectType('Student')
export class StudentType {
  @Field(() => ID, { nullable: true })
  _id?: string;

  @Field()
  name: string;

  @Field(() => Gender)
  gender: Gender;

  @Field()
  age: number;

  @Field({ nullable: true })
  grade?: string;

  @Field({ nullable: true })
  addresses?: string;
}
