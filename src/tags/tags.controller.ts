import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './schemas/tag.schema';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  //  find all tags
  @Get()
  async findAll(): Promise<{ tags: Tag[] }> {
    return this.tagsService.findAll();
  }
}
