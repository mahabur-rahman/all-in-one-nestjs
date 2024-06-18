import { InputType, PartialType } from '@nestjs/graphql';
import { CreateLessonDto } from './create-lesson.dto';

@InputType()
export class UpdateLessonDto extends PartialType(CreateLessonDto) {}
