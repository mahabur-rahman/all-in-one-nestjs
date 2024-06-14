import { Field, ID, ObjectType } from '@nestjs/graphql';
import { StudentType } from 'src/student/types/student.type';

@ObjectType('Lesson')
export class LessonType {
  @Field(() => String)
  _id: string;

  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string;

  @Field()
  endDate: string;

  @Field((type) => [StudentType])
  students: string[];
}
