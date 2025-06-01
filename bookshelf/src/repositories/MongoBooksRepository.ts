import {
    inject,
    injectable,
}                          from 'inversify';
import { BookModelType }           from '../models/Book.js';
import { BooksRepository } from './BooksRepository';
import IBook               from '../models/IBook';
import { TYPES } from '../container/types';

@injectable()
class MongoBooksRepository implements BooksRepository {
    constructor (@inject(TYPES.BookModel) private bookModel : BookModelType) {
    }

    async createBook (book : Partial<IBook>): Promise<IBook> {
        const newBook = new this.bookModel(book);
        return newBook.save();
    }

    async getBooks () : Promise<IBook[]> {
        return this.bookModel.find().exec();
    }

    async getBook (id : string) : Promise<IBook> {
        return this.bookModel.findById(id).exec();
    }

    async updateBook (id : string, updatedBook : Partial<IBook>) : Promise<IBook | null> {
        return this.bookModel.findByIdAndUpdate(id, updatedBook, { new: true });
    }

    async deleteBook (id : string) {
        const result = await this.bookModel.deleteOne({ _id: id });
        return result.deletedCount === 1;
    }
}

export default MongoBooksRepository;
