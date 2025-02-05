const express = require('express');
const router  = express.Router();

module.exports = (store, counterConnector) => {

    router.get('/:id', async (req, res) => {
        const { id } = req.params;
        const book   = store.getBookById(id);

        if (book) {
            try {
                // todo: сомнительное решение
                await counterConnector.getBookCountById(id, (data) => {
                    res.render('book/view', {
                        book,
                        counter: Number(data.counter) + 1,
                        title  : book.title,
                    });
                    counterConnector.increaseBookCounterById(id);
                });
            }
            catch (error) {
                console.log(error);
            }
        }
        else {
            res.redirect('/404');
        }
    });

    router.get('/:id/update', (req, res) => {
        const { id } = req.params;
        const book   = store.getBookById(id);

        if (book) {
            res.render('book/update', {
                title: book.title,
                book : book,
            });
        }
        else {
            res.redirect('/404');
        }
    });

    router.post('/:id/update', (req, res) => {
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
            res.redirect(`/book/${book.id}`);
        }
        else {
            res.redirect('/404');
        }
    });

    router.post('/:id/delete', (req, res) => {
        const books  = store.getBooks();
        const { id } = req.params;
        const idx    = store.getIndex(id);

        if (idx !== -1) {
            books.splice(idx, 1);
            res.redirect('/');
        }
        else {
            res.redirect('/404');
        }
    });

    return router;
};
