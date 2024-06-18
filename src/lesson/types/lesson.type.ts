import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { LessonStatus } from '../schema/lesson.schema';
import { StudentType } from '../../student/types/student.type';

// Register the LessonStatus enum with GraphQL
registerEnumType(LessonStatus, {
  name: 'LessonStatus',
});

@ObjectType('Lesson')
export class LessonType {
  @Field(() => ID)
  _id: string;

  @Field()
  lessonName: string;

  @Field()
  description: string;

  @Field()
  instructor: string;

  @Field(() => Date)
  startDate: Date;

  @Field(() => Date)
  endDate: Date;

  @Field(() => Int)
  duration: number;

  @Field(() => LessonStatus)
  status: LessonStatus;

  @Field(() => [StudentType])
  students: string[];
}
