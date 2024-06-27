import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentType } from './types/comment.type';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/utils/jwt.guard';

@Resolver()
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  // create a comment
  @Mutation(() => CommentType)
  @UseGuards(JwtGuard)
  async createComment(
    @Args('createCommentDto') createCommentDto: CreateCommentDto,
    @Context('user') user: any,
  ) {
    const userId = user._id;
    return await this.commentService.createComment(createCommentDto, userId);
  }

  // Get comments by quote reference
  @Query(() => [CommentType])
  @UseGuards(JwtGuard)
  async getCommentsByQuote(
    @Args('quoteId', { type: () => String }) quoteId: string,
  ) {
    return await this.commentService.getCommentsByQuote(quoteId);
  }

  // Delete a comment by comment ID
  @Mutation(() => CommentType)
  @UseGuards(JwtGuard)
  async deleteComment(
    @Args('commentId', { type: () => String }) commentId: string,
  ) {
    return await this.commentService.deleteComment(commentId);
  }

  // edit comment :id
  @Mutation(() => CommentType)
  @UseGuards(JwtGuard)
  async editComment(
    @Args('commentId', { type: () => String }) commentId: string,
    @Args('content', { type: () => String }) content: string,
  ) {
    return this.commentService.editComment(commentId, content);
  }
}
