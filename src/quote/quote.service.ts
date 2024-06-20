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
  async createQuote(createQuoteDto: CreateQuoteDto): Promise<Quote> {
    const { title, createBy } = createQuoteDto;

    const newQuote = new this.quoteModel({ title, createBy });

    return await newQuote.save();
  }
}
