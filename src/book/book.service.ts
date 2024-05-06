/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import {Query} from 'express-serve-static-core'
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private BookModel: mongoose.Model<Book>,
  ) {}

  //   create a book
  async createBook(book: Book, user: User) {
    const data = Object.assign(book, {user: user._id})
    const newBook = await this.BookModel.create(data);
    return newBook;
  }

  //   real all books
  async findAll(
    query: Query
  ): Promise<Book[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage -1 )

    const keyword = query.keyword ?  {
      title: {
        $regex: query.keyword,
        $options: 'i'
      }
    }: {}
    const books = await this.BookModel.find({...keyword}).limit(resPerPage).skip(skip);

    return books;
  }

  // get single book
  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException(`Please enter correct id..`);
    }

    const book = await this.BookModel.findById(id);

    if (!book) {
      throw new NotFoundException('Book not found! like so');
    }

    return book;
  }

  // update book
  async updateBook(id: string, book: Book): Promise<Book> {
    const updatedBook = await this.BookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });

    return updatedBook;
  }


  // delete book 
  async deleteBook(id: string): Promise<Book> {
    const deletedBook = await this.BookModel.findByIdAndDelete(id)
    return deletedBook
  }
}
