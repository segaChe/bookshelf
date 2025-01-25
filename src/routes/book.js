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

    return router;
};
