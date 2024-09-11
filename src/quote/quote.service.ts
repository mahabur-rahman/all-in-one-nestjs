import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quote } from './schema/quote.schema';
import { Model } from 'mongoose';
import { CreateQuoteDto } from './dto/create-quote.dto';
import { User } from 'src/auth/schema/user.schema';
import { NotificationService } from 'src/notification/notification.service';
import { QuoteFiltersInput } from './dto/quote-filters-input.dto';

@Injectable()
export class QuoteService {
  constructor(
    @InjectModel(Quote.name)
    private quoteModel: Model<Quote>,
    private notificationService: NotificationService, // Inject NotificationService
  ) {}

  // create a quote by authenticated user
  async createQuote(
    createQuoteDto: CreateQuoteDto,
    userId: string,
  ): Promise<Quote> {
    const {
      title,
      images,
      videos,
      rating,
      ratings,
      duration,
      languages,
      price,
      features,
      topics,
      level,
    } = createQuoteDto;

    const newQuote = new this.quoteModel({
      title,
      createBy: userId,
      images,
      videos,
      rating,
      duration,
      languages,
      price,
      features,
      topics,
      level,
      ratings,
    });

    // Publish the event after saving the quote
    const savedQuote = await newQuote.save();

    // Create a notification when a new quote is created
    await this.notificationService.createNotification(`${title}`, userId);

    return savedQuote;
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

  // get all quotes
  async getAllQuotes(filters?: QuoteFiltersInput): Promise<Quote[]> {
    let query = this.quoteModel.find();

    const filterConditions = {
      title: filters?.title
        ? { $regex: filters.title, $options: 'i' }
        : undefined,
      'ratings.average': filters?.minRating
        ? { $gte: filters.minRating }
        : undefined,
      languages: filters?.languages?.length
        ? { $in: filters.languages }
        : undefined,
      duration: filters?.durations?.length
        ? { $in: filters.durations }
        : undefined,
      features: filters?.features?.length
        ? { $in: filters.features }
        : undefined,
      topics: filters?.topics?.length ? { $in: filters.topics } : undefined,
      level: filters?.levels?.length ? { $in: filters.levels } : undefined,
      price: filters?.prices?.length ? { $in: filters.prices } : undefined,
    };

    // Apply filters dynamically
    Object.keys(filterConditions).forEach((key) => {
      if (filterConditions[key]) {
        query = query.where(key, filterConditions[key]);
      }
    });

    return await query
      .populate('createBy', '_id firstName lastName email password role')
      .populate('likes', '_id firstName lastName email role')
      .populate('dislikes', '_id firstName lastName email role')
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

  // dislike quotes
  async dislikeQuote(quoteId: string, userId: User): Promise<Quote> {
    const quote = await this.quoteModel.findById(quoteId);

    if (!quote) {
      throw new NotFoundException('Quote not found');
    }

    const userIdString = userId.toString();

    // Check if the user has already disliked the quote
    if (quote.dislikes.some((id) => id && id.toString() === userIdString)) {
      throw new BadRequestException('User has already disliked this quote');
    }

    // Add user to dislikes
    quote.dislikes.push(userId);

    // Remove user from likes if present
    quote.likes = quote.likes.filter(
      (likeUserId) => likeUserId && likeUserId.toString() !== userIdString,
    );

    await quote.save();

    return quote;
  }

  // for increase rating
  async increaseRating(
    id: string,
    rating: number,
    userId: string,
  ): Promise<Quote> {
    const quote = await this.quoteModel.findById(id);
    if (!quote) {
      throw new NotFoundException(`Quote with ID ${id} not found`);
    }
    if (rating < 0 || rating > 5) {
      throw new ForbiddenException(`Rating must be between 0 and 5`);
    }
    quote.rating = rating;
    return await quote.save();
  }
}
