import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schemas/tag.schema';
import mongoose from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private TagModel: mongoose.Model<Tag>,
  ) {}

  // crate tags
  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const newTag = await this.TagModel.create(createTagDto);
    return newTag;
  }
  // find all tags
  async findAll(): Promise<{ tags: Tag[] }> {
    const tags = await this.TagModel.find();
    return { tags };
  }
}
