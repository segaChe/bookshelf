import { Module }         from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { env }            from './config/env';
import { AppController }  from './app.controller';
import { AppService }     from './app.service';
import { BooksModule }    from './books/books.module';

@Module(
    {
        imports    : [
            MongooseModule.forRoot(env.MONGO_CONNECTION),
            BooksModule,
        ],
        controllers: [AppController],
        providers  : [AppService],
    },
)
export class AppModule {
}
