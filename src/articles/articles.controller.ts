import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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

  // find article using :slug
  @Get(':slug')
  async findArticle(@Param('slug') slug: string): Promise<Article> {
    return await this.articlesService.findArticleBySlug(slug);
  }
}
