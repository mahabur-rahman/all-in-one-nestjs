import { Resolver } from '@nestjs/graphql';
import { CalenderService } from './calender.service';

@Resolver('Calender')
export class CalenderResolver {
  constructor(private readonly calenderService: CalenderService) {}
}
