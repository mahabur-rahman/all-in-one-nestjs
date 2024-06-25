import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
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
}
