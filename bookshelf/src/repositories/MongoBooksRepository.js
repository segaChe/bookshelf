const { inject, injectable } = require('inversify');
const BookModel  = require('../models/Book.js');

@injectable()
class MongoBooksRepository {
    constructor (@inject(BookModel) bookModel) {
        this.bookModel = bookModel;
    }

    async createBook (book) {
        const newBook = new this.bookModel(book);
        await newBook.save();
        return newBook;
    }

    async getBooks () {
        return await this.bookModel.find().select('-__v');
    }

    async getBook (id) {
        return await this.bookModel.findById(id).select('-__v');
    }

    async updateBook (id, updatedBook) {
        return await this.bookModel.findByIdAndUpdate(id, updatedBook);
    }

    async deleteBook (id) {
        return await this.bookModel.deleteOne({ _id: id });
    }
}

module.exports = MongoBooksRepository;
