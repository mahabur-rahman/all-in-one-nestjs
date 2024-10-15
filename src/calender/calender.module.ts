import { Module } from '@nestjs/common';
import { CalenderResolver } from './calender.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Calendar, CalendarSchema } from './schema/calender.schema';
import { CalendarService } from './calender.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Calendar.name, schema: CalendarSchema },
    ]),
  ],
  providers: [CalenderResolver, CalendarService],
})
export class CalenderModule {}
