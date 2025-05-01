import { Book } from './Book';

export abstract class BooksRepository {
    createBook (book : Book) : void

    getBook (id : number) : Book | null

    getBooks () : Book[]

    updateBook (id : number, book : Book) : void

    deleteBook (id : number) : void
}
