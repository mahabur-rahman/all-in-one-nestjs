import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Calendar } from './schema/calender.schema';
import { CreateCalendarDto } from './dto/create-calender.dto';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar.name) private readonly calendarModel: Model<Calendar>,
  ) {}

  // Create a calendar
  async createCalender(
    createCalendarDto: CreateCalendarDto,
  ): Promise<Calendar> {
    const newCalendar = new this.calendarModel(createCalendarDto);
    return newCalendar.save();
  }

  // Find all calendars
  async findAll(): Promise<Calendar[]> {
    return this.calendarModel.find().exec();
  }
}
