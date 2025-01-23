const express      = require('express');
const { v4: uuid } = require('uuid');
const Book         = require('../../Book');
const router       = express.Router();
const coverFileMulter   = require('../../middleware/fileCover');
const bookFileMulter   = require('../../middleware/fileBook');

module.exports = (store) => {
    router.get('/', (req, res) => {
        res.json(store.getBooks());
    });

    router.post('/', (req, res) => {
        const {
                  title,
                  authors,
                  description = '',
                  favorite    = '',
                  fileCover   = '',
                  fileName    = '',
              } = req.body;

        if (title && authors) {
            const newBook = new Book({
                title,
                authors,
                description,
                favorite,
                fileCover,
                fileName,
            });
            store.addBook(newBook);

            res.status(201);
            res.json(newBook);
        }
        else {
            res.status(400);
            res.json('400 | Bad request | Не задано обязательное поле title или authors');
        }
    });

    router.get('/:id', (req, res) => {
        const { id } = req.params;
        const book   = store.getBookById(id);

        if (book) {
            res.json(book);
        }
        else {
            res.status(404);
            res.json('404 | страница не найдена');
        }

    });

    router.put('/:id', (req, res) => {
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

        const book = store.updateBook(updatedBook, id);
        if (book) {
            res.json(book);
        }
        else {
            res.status(404);
            res.json('404 | страница не найдена');
        }
    });

    router.delete('/:id', (req, res) => {
        const books  = store.getBooks();
        const { id } = req.params;
        const idx    = store.getIndex(id);

        if (idx !== -1) {
            books.splice(idx, 1);
            res.json('ok');
        }
        else {
            res.status(404);
            res.json('404 | страница не найдена');
        }
    });

    router.post(
        '/:id/upload-cover',
        coverFileMulter.single('cover'),
        (req, res) => {
            if (req.file) {
                const { id }   = req.params;
                const { path } = req.file;
                const book     = store.updateBook({ fileCover: path }, id);

                res.json(book);
            }
            else {
                res.json('no file uploaded');
            }
        },
    );

    router.post(
        '/:id/upload-book',
        bookFileMulter.single('book'),
        (req, res) => {
            if (req.file) {
                const { id }   = req.params;
                const { path } = req.file;
                const book     = store.updateBook({ fileBook: path }, id);

                res.json(book);
            }
            else {
                res.json('no file uploaded');
            }
        },
    );

    router.get(
        '/:id/download',
        (req, res) => {
            const { id } = req.params;
            const book   = store.getBookById(id);
            const file = book.fileBook;
            res.download(file, `${ book.name } - ${book.authors.join(',')}`);
        },
    );

    return router;
};
