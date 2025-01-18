class Store {
    constructor (books = []) {
        this.books = books;
    }

    getBooks () {
        return this.books;
    }

    getBookById (bookId) {
        const idx = this.getIndex(bookId);
        return idx > -1 ? this.books[idx] : null;
    }

    getIndex (bookId) {
        return this.books.findIndex(el => el.id === bookId);
    }

    addBook (book) {
        this.books = [...this.books, book];
    }

    updateBook (updatedBook, id) {
        const idx = this.getIndex(id);

        if (idx > -1) {
            const books = JSON.parse(JSON.stringify(this.books));
            books[idx]  = { ...JSON.parse(JSON.stringify(this.books[idx])), ...updatedBook };
            this.books  = books;
            return books[idx];
        }
        else {
            return null;
        }
    }
}

module.exports = Store;
