import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { Article } from './schemas/article.schema';
import { CreateArticleDto } from './dto/create-article.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateArticleDto } from './dto/update-article.dto';

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
  async findArticle(
    @Param('slug')
    slug: string,
  ): Promise<Article> {
    return await this.articlesService.findArticleBySlug(slug);
  }

  // if update article title slug automatic updated
  @Put(':slug')
  async updateArticle(
    @Param('slug') slug: string,
    @Body() updateArticleDto: UpdateArticleDto,
    @Req() req,
  ): Promise<Article> {
    return await this.articlesService.updateArticleBySlug(
      slug,
      updateArticleDto,
      req.user._id,
    );
  }

  // delete article using slug
  @Delete(':slug')
  async deleteArticle(
    @Param('slug')
    slug: string,
    @Req()
    req,
  ): Promise<Article> {
    return await this.articlesService.deleteArticleBySlug(slug, req.user._id);
  }
}
