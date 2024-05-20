/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TagsService {
  // constructor(
  //     @InjectModel()
  // ){}

  // find all tags
  findAll(): string[] {
    return ['1'];
  }
}
