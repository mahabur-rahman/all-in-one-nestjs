import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CalendarType } from './types/calender.type';
import { CreateCalendarDto } from './dto/create-calender.dto';
import { CalendarService } from './calender.service';
import { UpdateCalendarDto } from './dto/update-calender.dto';

@Resolver(() => CalendarType)
export class CalenderResolver {
  constructor(private readonly calendarService: CalendarService) {}

  // create calender event
  @Mutation(() => CalendarType)
  createCalendar(
    @Args('createCalendarDto') createCalendarDto: CreateCalendarDto,
  ) {
    return this.calendarService.createCalender(createCalendarDto);
  }

  // get all calender events
  @Query(() => [CalendarType])
  async getAllCalendars() {
    return this.calendarService.findAll();
  }

  // Update only startDate and endDate
  @Mutation(() => CalendarType)
  updateCalendar(
    @Args('id') id: string,
    @Args('updateCalendarDto') updateCalendarDto: UpdateCalendarDto,
  ) {
    return this.calendarService.updateCalendar(id, updateCalendarDto);
  }
}
