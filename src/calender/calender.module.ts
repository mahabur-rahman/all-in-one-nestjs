import { Module } from '@nestjs/common';
import { CalenderService } from './calender.service';
import { CalenderResolver } from './calender.resolver';

@Module({
  providers: [CalenderResolver, CalenderService],
})
export class CalenderModule {}
