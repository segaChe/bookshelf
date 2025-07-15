class Store {
    private books : any[];

    constructor (books: any[] = []) {
        this.books = books;
    }

    getBooks () {
        return this.books;
    }

    getBookById (bookId: any) {
        const idx = this.getIndex(bookId);
        return idx > -1 ? this.books[idx] : null;
    }

    getIndex (bookId: any) {
        return this.books.findIndex(el => el.id === bookId);
    }

    addBook (book: any) {
        this.books = [...this.books, book];
    }

    updateBook (updatedBook: any, id: any) {
        const idx = this.getIndex(id);

        if (idx > -1) {
            const books = JSON.parse(JSON.stringify(this.books));
            books[idx] = { ...JSON.parse(JSON.stringify(this.books[idx])), ...updatedBook };
            this.books = books;
            return books[idx];
        }
        else {
            return null;
        }
    }
}

export default Store;
