import type IBook from '../models/IBook';

export interface BooksRepository {
    createBook: (book : Partial<IBook>) => Promise<IBook>;

    getBook: (id : string) => Promise<IBook | null>;

    getBooks: () => Promise<IBook[]>;

    updateBook: (id : string, book : Partial<IBook>) => Promise<IBook | null>;

    deleteBook: (id : string) => Promise<boolean>;
}
