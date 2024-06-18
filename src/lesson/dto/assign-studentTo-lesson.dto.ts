import { Field, ID, InputType } from '@nestjs/graphql';

@InputType()
export class AssignStudentsToLessonDto {
  @Field(() => ID)
  lessonId: string;

  @Field((type) => [ID])
  studentIds: string[];
}
