import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './schemas/tag.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'tags', schema: TagSchema }])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
