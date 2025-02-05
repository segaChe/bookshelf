const express = require('express');
const index   = express.Router();

module.exports = (client) => {
    index.get('/:bookId', async (req, res) => {
        const { bookId } = req.params;

        try {
            const value = await client.get(bookId);
            res.status(200);
            res.json({ counter: value });
        }
        catch (error) {
            console.error(error);
        }
    });

    index.post('/:bookId/incr', async (req, res) => {
        const { bookId } = req.params;

        try {
            const value = await client.incr(bookId);
            res.json({ counter: value });
        }
        catch (error) {
            console.error(error);
        }
    });

    return index;
};
