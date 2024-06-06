import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('articles')
@UseGuards(AuthGuard())
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  // create article
  @Post('/create')
  async createArticle(
    @Body()
    article: CreateArticleDto,
    @Req()
    req,
  ): Promise<Article> {
    return await this.articlesService.createArticle(article, req.user);
  }
}
