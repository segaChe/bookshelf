import { Book } from './Book';

export abstract class BooksRepository {
    abstract createBook (book : Book) : void

    abstract getBook (id : number) : Book | null

    abstract getBooks () : Book[]

    abstract updateBook (id : number, book : Book) : void

    abstract deleteBook (id : number) : void
}
