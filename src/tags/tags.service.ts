import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tag } from './schemas/tag.schema';
import mongoose from 'mongoose';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagsService {
  constructor(
    @InjectModel(Tag.name)
    private TagModel: mongoose.Model<Tag>,
  ) {}

  // crate tags
  async createTag(createTagDto: CreateTagDto): Promise<Tag> {
    const createdTag = new this.TagModel(createTagDto);
    return createdTag.save();
  }
  // find all tags
  async findAll(): Promise<{ tags: Tag[] }> {
    const tags = await this.TagModel.find();
    return { tags };
  }

  // get single tag
  async findOne(id: string): Promise<Tag> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException(`Please enter correct id.`);
    }

    const tag = await this.TagModel.findById(id);

    if (!tag) {
      throw new NotFoundException(`Tag is not found!`);
    }

    return this.TagModel.findById(id);
  }

  // update tag
  async updateTag(
    id: string,
    updateTagDto: UpdateTagDto,
  ): Promise<UpdateTagDto> {
    const modifyTag = await this.TagModel.findByIdAndUpdate(id, updateTagDto, {
      new: true,
      runValidators: true,
    });

    return modifyTag;
  }

  // delete tag
  async deleteTag(id: string): Promise<Tag> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException(`Please enter correct id.`);
    }

    const tag = await this.TagModel.findById(id);

    if (!tag) {
      throw new NotFoundException(`Tag is not found!`);
    }

    await this.TagModel.findByIdAndDelete(id);

    return tag;
  }
}