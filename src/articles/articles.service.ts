import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import mongoose from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private readonly articleModel: mongoose.Model<Article>,
  ) {}

  //   create article
  async createArticle(
    createArticleDto: CreateArticleDto,
    user: User,
  ): Promise<Article> {
    const data = Object.assign(createArticleDto, { author: user._id });

    const newArticle = await this.articleModel.create(data);
    return newArticle;
  }
}
