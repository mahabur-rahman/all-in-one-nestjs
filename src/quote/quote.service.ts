import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quote } from './schema/quote.schema';
import { Model } from 'mongoose';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { User } from 'src/auth/schema/user.schema';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote.name)
    private quoteModel: Model<Quote>,
  ) {}

  // create a quote by authenticated user
  async createQuote(
    createQuoteDto: CreateQuoteDto,
    userId: string,
  ): Promise<Quote> {
    const { title } = createQuoteDto;

    const newQuote = new this.quoteModel({ title, createBy: userId });

    return await newQuote.save();
  }

  // =====================================================
  // =====================================================
  // =====================================================

  // query getAllQuotes{
  //   getAllQuotes{
  //     _id
  //     title
  //     createBy{
  //       _id
  //       firstName
  //       lastName
  //       email
  //       role
  //     }
  //   }
  // }
  //   get all quotes
  async getAllQuotes(title: string): Promise<Quote[]> {
    let query = this.quoteModel.find();

    if (title) {
      query = query.where('title', {
        $regex: title,
        $options: 'i',
      });
    }

    return await query
      .populate('createBy', '_id firstName lastName email password role')
      .exec();
  }

  //   get single quote :id
  async getSingleQuoteById(id: string): Promise<Quote> {
    return await this.quoteModel
      .findById(id)
      .populate('createBy', '_id firstName lastName email password role');
  }

  // delete quote :id if user id matches with createBy in quote
  async deleteQuoteById(id: string, userId: string): Promise<Quote> {
    const quote = await this.quoteModel.findById(id).exec();
    if (!quote) {
      throw new NotFoundException(`Quote with id ${id} not found`);
    }

    if (quote.createBy.toString() !== userId) {
      throw new UnauthorizedException(
        'You do not have permission to delete this quote',
      );
    }

    return await this.quoteModel.findByIdAndDelete(id).exec();
  }

  //   update quote :id
  async updateQuoteById(
    id: string,
    title: string,
    userId: string,
  ): Promise<Quote> {
    const quote = await this.quoteModel.findById(id).exec();

    if (!quote) {
      throw new NotFoundException(`Quote is not found with this ${id}`);
    }

    if (quote.createBy.toString() !== userId) {
      throw new UnauthorizedException(
        'You do not have permission to update this quote',
      );
    }
    return await this.quoteModel
      .findByIdAndUpdate(id, { title }, { new: true })
      .exec();
  }

  //  likes quotes
  async likeQuote(quoteId: string, userId: User): Promise<Quote> {
    const quote = await this.quoteModel.findById(quoteId);

    if (!quote) {
      throw new NotFoundException('Quote not found');
    }

    // Check if the user has already liked the quote
    if (quote.likes.includes(userId)) {
      throw new BadRequestException('User has already liked this quote');
    }

    // Add user to likes
    quote.likes.push(userId);

    // Remove user from dislikes if present
    quote.dislikes = quote.dislikes.filter(
      (dislikeUserId) => dislikeUserId.toString() !== userId.toString(),
    );

    await quote.save();

    return quote;
  }
}
