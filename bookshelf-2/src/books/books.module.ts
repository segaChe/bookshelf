import { Module }           from '@nestjs/common';
import { MongooseModule }   from '@nestjs/mongoose';
import { BooksController }  from './books.controller';
import { BooksService }     from './books.service';
import { Book, BookSchema } from './book.schema';

@Module(
    {
        controllers: [BooksController],
        providers  : [BooksService],

        imports: [
            MongooseModule.forFeature(
                [
                    { name: Book.name, schema: BookSchema },
                ],
            ),
        ],
        exports: [BooksService],
    },
)
export class BooksModule {
}
