import {
    Controller,
    Get,
    Post,
    Param,
    Body,
    Delete,
    Put,
}                        from '@nestjs/common';
import { BooksService }  from './books.service';
import { Book }          from './book.entity';
import { UpdateBookDto } from './update-book.dto';
import { CreateBookDto } from './create-book.dto';

@Controller('books')
export class BooksController {
    constructor (private readonly booksService : BooksService) {}

    @Get()
    getAll () : Book[] {
        return this.booksService.findAll();
    }

    @Get(':id')
    getOne (@Param('id') id : string) : Book {
        return this.booksService.findOne(id);
    }

    @Post()
    create (@Body() bookData : CreateBookDto) : Book {
        return this.booksService.create(bookData);
    }

    @Put(':id')
    update (
        @Param('id') id : string,
        @Body() bookData : UpdateBookDto,
    ) : Book {
        return this.booksService.update(id, bookData);
    }

    @Delete(':id')
    remove (@Param('id') id : string) : void {
        return this.booksService.remove(id);
    }
}
