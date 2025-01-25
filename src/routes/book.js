const express = require('express');
const router  = express.Router();

module.exports = (store) => {
    router.get('/:id', (req, res) => {
        const { id } = req.params;
        const book   = store.getBookById(id);

        res.render('book/view', {
            title: book.title,
            book : book,
        });
    });

    router.get('/:id/update', (req, res) => {
        const { id } = req.params;
        const book   = store.getBookById(id);

        res.render('book/update', {
            title: book.title,
            book : book,
        });
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
            res.status(404);
        }
    });

    return router;
};
