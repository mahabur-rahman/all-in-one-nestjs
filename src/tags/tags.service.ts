import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schemas/tag.schema';
import mongoose from 'mongoose';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private TagModel: mongoose.Model<Tag>,
  ) {}

  // find all tags
  async findAll(): Promise<{ tags: Tag[] }> {
    const tags = await this.TagModel.find();
    return { tags };
  }
}
