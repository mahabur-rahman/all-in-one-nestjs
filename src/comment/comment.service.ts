import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schema/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name)
    private commentModel: Model<Comment>,
  ) {}

  //   create a comment
  async createComment(
    createCommentDto: CreateCommentDto,
    userId: string,
  ): Promise<Comment> {
    const { content, quoteRef } = createCommentDto;
    const newComment = new this.commentModel({
      content,
      commentedBy: userId,
      quoteRef,
    });
    return await newComment.save();
  }
}
