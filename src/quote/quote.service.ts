import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quote } from './schema/quote.schema';
import { Model } from 'mongoose';
import { CreateQuoteDto } from './dto/create-quote.dto';

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

  //   get all quotes
  async getAllQuotes(): Promise<Quote[]> {
    return await this.quoteModel.find().exec();
  }

  //   get single quote :id
  async getSingleQuoteById(id: string): Promise<Quote> {
    return await this.quoteModel.findById(id).exec();
  }

  //   delete quote :id
  async deleteQuoteById(id: string): Promise<Quote> {
    return await this.quoteModel.findByIdAndDelete(id).exec();
  }

  //   update quote :id
  async updateQuoteById(id: string, title: string): Promise<Quote> {
    return await this.quoteModel
      .findByIdAndUpdate(id, { title }, { new: true })
      .exec();
  }
}
