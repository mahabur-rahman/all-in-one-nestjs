import { Query, Resolver } from '@nestjs/graphql';
import { LessonService } from './lesson.service';
import { LessonType } from './types/lesson.type';

@Resolver((of) => LessonType)
export class LessonResolver {
  constructor(private readonly lessonService: LessonService) {}

  @Query((returns) => LessonType)
  lesson() {
    return {
      id: '3546',
      name: 'test',
      startDate: '2019-01-01',
      endDate: '2019-01-01',
    };
  }
}
