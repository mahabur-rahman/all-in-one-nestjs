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
      .populate({
        path: 'replies.repliedBy',
      })
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
  async editComment(commentId: string, content: string): Promise<Comment> {
    const comment = await this.commentModel.findById(commentId);

    if (!comment) {
      throw new NotFoundException('Comment not found!');
    }

    comment.content = content;
    await comment.save();
    return comment;
  }

  //  reply comment

  async replyToComment(
    parentCommentId: string,
    replyContent: string,
    userId: any,
  ): Promise<Comment> {
    const parentComment = await this.commentModel.findById(parentCommentId);

    if (!parentComment) {
      throw new NotFoundException('Parent comment not found');
    }

    const reply = {
      replyContent,
      repliedBy: userId,
    };

    parentComment.replies.push(reply);
    await parentComment.save();

    return parentComment;
  }
}
