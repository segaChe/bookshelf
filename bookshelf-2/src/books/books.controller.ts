import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Delete,
    Put,
}                                             from '@nestjs/common';
import { HydratedDocument, QueryWithHelpers } from 'mongoose';
import { BooksService }                       from './books.service';
import { BookDocument }                       from './book.schema';
import { UpdateBookDto }                      from './update-book.dto';
import { CreateBookDto }                      from './create-book.dto';

@Controller('books')
export class BooksController {
    constructor (private readonly booksService : BooksService) {}

    @Get()
    getAll () : Promise<BookDocument[]> {
        return this.booksService.findAll();
    }

    @Get(':id')
    getOne (@Param('id') id : string) : Promise<BookDocument|null> {
        return this.booksService.findOne(id);
    }

    @Post()
    create (@Body() bookData : CreateBookDto) : Promise<BookDocument> {
        return this.booksService.create(bookData);
    }

    @Put(':id')
    update (
        @Param('id') id : string,
        @Body() bookData : UpdateBookDto,
    ) : QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.booksService.update(id, bookData);
    }

    @Delete(':id')
    remove (@Param('id') id : string) : QueryWithHelpers<HydratedDocument<BookDocument, {}, {}> | null, HydratedDocument<BookDocument, {}, {}>, {}, BookDocument> {
        return this.booksService.remove(id);
    }
}
