const express = require('express');
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

    return router;
};
