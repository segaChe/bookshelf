const express              = require('express');
const Book                 = require('../../../models/Book');
const router               = express.Router();
const coverFileMulter      = require('../../../middleware/fileCover');
const bookFileMulter       = require('../../../middleware/fileBook');
const { container }        = require('../../../container');
const MongoBooksRepository = require('../../../repositories/MongoBooksRepository');

const booksRepo = container.get(MongoBooksRepository);

module.exports = () => {
    router.get('/', async (req, res) => {
        try {
            const books = await booksRepo.getBooks();
            res.json(books);
        }
        catch (err) {
            res.status(500).json(err);
        }
    });

    router.post('/', async (req, res) => {
        const {
                  title,
                  authors,
                  description = '',
                  favorite    = false,
                  fileCover   = '',
                  fileName    = '',
              } = req.body;

        if (title && authors) {
            try {
                const newBook = await booksRepo.createBook({
                    title,
                    authors,
                    description,
                    favorite,
                    fileCover,
                    fileName,
                });

                res.status(201);
                res.json(newBook);
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
        else {
            res.status(400);
            res.json('400 | Bad request | Не задано обязательное поле title или authors');
        }
    });

    router.get('/:id', async (req, res) => {
        const { id } = req.params;

        try {
            const book = await booksRepo.getBook(id);
            if (book) {
                res.json(book);
            }
            else {
                res.status(404);
                res.json('404 | страница не найдена');
            }
        }
        catch (e) {
            res.status(500).json(e);
        }
    });

    router.put('/:id', async (req, res) => {
        const { id }      = req.params;
        const {
                  title,
                  authors,
                  description,
                  favorite,
                  fileCover,
                  fileName,
              }           = req.body;
        const updatedBook = {};

        if (title !== undefined) {
            updatedBook.title = title;
        }
        if (authors !== undefined) {
            updatedBook.authors = authors;
        }
        if (description !== undefined) {
            updatedBook.description = description;
        }
        if (favorite !== undefined) {
            updatedBook.favorite = favorite;
        }
        if (fileCover !== undefined) {
            updatedBook.fileCover = fileCover;
        }
        if (fileName !== undefined) {
            updatedBook.fileName = fileName;
        }

        try {
            const book = await booksRepo.updateBook(id, updatedBook);
            if (book) {
                res.json(book);
            }
            else {
                res.status(404);
                res.json('404 | страница не найдена');
            }
        }
        catch (e) {
            res.status(500).json(e);
        }
    });

    router.delete('/:id', async (req, res) => {
        const { id } = req.params;

        try {
            await booksRepo.deleteBook(id);
            res.json('ok');
        }
        catch (e) {
            res.status(500).json(e);
        }
    });

    router.post(
        '/:id/upload-cover',
        coverFileMulter.single('cover'),
        async (req, res) => {
            if (req.file) {
                const { id }   = req.params;
                const { path } = req.file;

                try {
                    const book = await Book.findByIdAndUpdate(id, { fileCover: path });
                    if (book) {
                        res.json(book);
                    }
                    else {
                        res.status(404);
                        res.json('404 | страница не найдена');
                    }
                }
                catch (e) {
                    res.status(500).json(e);
                }
            }
            else {
                res.json('no file uploaded');
            }
        },
    );

    router.post(
        '/:id/upload-book',
        bookFileMulter.single('book'),
        async (req, res) => {
            if (req.file) {
                const { id }   = req.params;
                const { path } = req.file;

                try {
                    const book = await Book.findByIdAndUpdate(id, { fileBook: path });
                    if (book) {
                        res.json(book);
                    }
                    else {
                        res.status(404);
                        res.json('404 | страница не найдена');
                    }
                }
                catch (e) {
                    res.status(500).json(e);
                }
            }
            else {
                res.json('no file uploaded');
            }
        },
    );

    router.get(
        '/:id/download',
        async (req, res) => {
            const { id } = req.params;

            try {
                const book = await Book.findById(id).select('-__v');
                const file = book.fileBook;
                res.download(file, `${book.name} - ${book.authors}`);
            }
            catch (e) {
                res.status(500).json(e);
            }
        },
    );

    return router;
};
