import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tag } from './schemas/tag.schema';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

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

  // get single tag
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Tag> {
    return await this.tagsService.findOne(id);
  }

  // update tag
  @Put(':id')
  async updateTag(
    @Param('id')
    id: string,
    @Body()
    updateTagDto: UpdateTagDto,
  ) {
    return this.tagsService.updateTag(id, updateTagDto);
  }

  // delete tag
  @Delete(':id')
  async deleteTag(@Param('id') id: string): Promise<Tag> {
    return this.tagsService.deleteTag(id);
  }
}
