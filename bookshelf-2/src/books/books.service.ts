import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
    private books: Book[] = [];
    private idCounter = 1;

    findAll(): Book[] {
        return this.books;
    }

    findOne(id: string): Book {
        const book = this.books.find((b) => b.id === id);
        if (!book) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        return book;
    }

    create(bookData: Partial<Omit<Book, 'id'>>): Book {
        const newBook: Book = { id: `book-${this.idCounter++}`, ...bookData } as Book;
        this.books.push(newBook);
        return newBook;
    }

    update(id: string, updatedData: Partial<Omit<Book, 'id'>>): Book {
        const book: Book = this.findOne(id);
        Object.assign(book, updatedData);
        return book;
    }

    remove(id: string): void {
        const index = this.books.findIndex((b) => b.id === id);
        if (index === -1) {
            throw new NotFoundException(`Book with id ${id} not found`);
        }
        this.books.splice(index, 1);
    }
}
