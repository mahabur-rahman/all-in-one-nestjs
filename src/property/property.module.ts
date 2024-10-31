import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyResolver } from './property.resolver';

@Module({
  providers: [PropertyResolver, PropertyService],
})
export class PropertyModule {}
