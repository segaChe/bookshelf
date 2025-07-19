import { Injectable, NotFoundException }                         from '@nestjs/common';
import { InjectModel, InjectConnection }                         from '@nestjs/mongoose';
import { Model, Connection, HydratedDocument, QueryWithHelpers } from 'mongoose';
import { Book, BookDocument }                                    from './book.schema';

@Injectable()
export class BooksService {
    constructor (
        @InjectModel(Book.name) private BookModel : Model<BookDocument>,
        @InjectConnection() private connection : Connection,
    ) {}

    findAll () : Promise<BookDocument[]> {
        return this.BookModel.find().exec();
    }

    findOne (id : string) : Promise<BookDocument|null> {
        return this.BookModel.findById(id).exec();
    }

    create (bookData : Partial<Omit<Book, 'id'>>) : Promise<BookDocument> {
        const newBook = new this.BookModel(bookData);
        return newBook.save();
    }

    update (id : string, updatedData : Partial<Omit<Book, 'id'>>) : QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BookModel.findByIdAndUpdate(id, updatedData, { new: true });
    }

    remove (id : string) : QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.BookModel.findByIdAndDelete({ _id: id });
    }
}
