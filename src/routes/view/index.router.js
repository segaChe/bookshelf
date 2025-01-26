const express = require('express');
const Book    = require('../../model/Book');
const router  = express.Router();

module.exports = (store) => {
    router.get('/', (req, res) => {
        res.render('index', {
            title: 'Books',
            books: store.getBooks(),
        });
    });

    router.get('/create', (req, res) => {
        res.render('book/create', {
            title: 'New book',
            book : {},
        });
    });

    router.post('/create', (req, res) => {
        const {
                  title,
                  authors,
                  description = '',
              } = req.body;

        if (title && authors) {
            const newBook = new Book({
                title,
                authors,
                description,
            });
            store.addBook(newBook);

            res.status(201);
            res.redirect(`/book/${newBook.id}`);
        }
        else {
            res.status(400);
        }
    });

    return router;
};
