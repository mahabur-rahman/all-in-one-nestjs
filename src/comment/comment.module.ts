import { forwardRef, Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentResolver } from './comment.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { CommentSchema } from './schema/comment.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    forwardRef(() => AuthModule),
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
