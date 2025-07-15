import { Container }                      from 'inversify';
import MongoBooksRepository               from '../repositories/MongoBooksRepository';
import { BookModelType, createBookModel } from '../models/Book';
import { TYPES }                          from './types';
import { BooksRepository }                from '../repositories/BooksRepository';

const container = new Container();

container.bind<BookModelType>(TYPES.BookModel)
    .toDynamicValue(() => createBookModel())
    .inSingletonScope();

container.bind<BooksRepository>(TYPES.BooksRepository)
    .to(MongoBooksRepository)
    .inSingletonScope();

export { container };
