import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Article } from './schemas/article.schema';
import mongoose from 'mongoose';
import { CreateArticleDto } from './dto/create-article.dto';
import { User } from 'src/auth/schemas/user.schema';
import slugify from 'slugify';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Query } from 'express-serve-static-core';

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

  // find article using :slug
  async findArticleBySlug(slug: string): Promise<Article> {
    const article = await this.articleModel.findOne({ slug });
    if (!article) {
      throw new NotFoundException(`Article not found.`);
    }

    return article;
  }

  // if update article title slug automatic updated
  async updateArticleBySlug(
    slug: string,
    updateArticleDto: UpdateArticleDto,
    userId: string,
  ): Promise<Article> {
    const article = await this.articleModel.findOne({ slug }).exec();

    if (!article) {
      throw new NotFoundException('Article not found.');
    }

    if (article.author.toString() !== userId.toString()) {
      throw new HttpException(
        'You do not have permission to update this article!',
        HttpStatus.FORBIDDEN,
      );
    }

    if (updateArticleDto.title && updateArticleDto.title !== article.title) {
      const newSlug = await this.generateUniqueSlug(updateArticleDto.title);
      const updatedArticle = {
        ...updateArticleDto,
        slug: newSlug,
      };
      Object.assign(article, updatedArticle);
    } else {
      Object.assign(article, updateArticleDto);
    }

    await article.save();

    return article;
  }

  // delete article using slug
  async deleteArticleBySlug(slug: string, userId: string): Promise<Article> {
    const article = await this.articleModel.findOne({ slug }).exec();

    if (!article) {
      throw new HttpException(
        `Article doesn't exist!`,
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    if (article.author.toString() !== userId.toString()) {
      throw new HttpException(
        `You do not have permission to delete this article!`,
        HttpStatus.FORBIDDEN,
      );
    }

    await this.articleModel.deleteOne({ _id: article._id });
    return article;
  }

  // Read All articles
  async findAll(query: Query): Promise<Article[]> {
    const { limit } = query;

    let mongooseQuery = this.articleModel.find();

    if (limit) {
      mongooseQuery = mongooseQuery.limit(+limit);
    }

    const articles = await mongooseQuery.populate('author').exec();
    return articles;
  }

  async countAll(query: Query): Promise<number> {
    const { limit, ...countQuery } = query;

    const count = await this.articleModel.countDocuments(countQuery).exec();
    return count;
  }
}
