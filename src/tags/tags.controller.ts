import { Body, Controller, Get, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  // create tags
  @Post('/create')
  async createTag(
    @Body()
    crateTagDto: CreateTagDto,
  ): Promise<Tag> {
    return await this.tagsService.createTag(crateTagDto);
  }

  //  find all tags
  @Get()
  async findAll(): Promise<{ tags: Tag[] }> {
    return this.tagsService.findAll();
  }
}
