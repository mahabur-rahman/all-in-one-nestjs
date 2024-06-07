import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import mongoose from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { User } from 'src/auth/schemas/user.schema';
import slugify from 'slugify';

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
    const slug = await this.generateUniqueSlug(createArticleDto.title);
    const data = Object.assign(createArticleDto, { author: user._id, slug });

    const newArticle = await this.articleModel.create(data);
    return newArticle;
  }

  // Generate unique slug
  private async generateUniqueSlug(title: string): Promise<string> {
    const slug = slugify(title, { lower: true });
    let uniqueSlug = slug;
    let count = 1;

    // Check if the slug already exists in the database
    while (await this.articleModel.exists({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${count}`;
      count++;
    }

    return uniqueSlug;
  }
}
