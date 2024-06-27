import { Injectable, NotFoundException } from '@nestjs/common';
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

  // Get comments by quote reference
  async getCommentsByQuote(quoteId: string): Promise<Comment[]> {
    return await this.commentModel
      .find({ quoteRef: quoteId })
      .populate('commentedBy')
      .exec();
  }

  // Delete a comment by comment ID
  async deleteComment(commentId: string): Promise<Comment> {
    // Ensure that the comment exists before attempting deletion
    const comment = await this.commentModel.findByIdAndDelete(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  // edit comment :id
  // Edit comment by ID
  async editComment(commentId: string, content: string): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found!');
    }

    comment.content = content;
    await comment.save();
    return comment;
  }
}
