const express = require('express');
const index   = express.Router();

module.exports = (client) => {
    index.get('/:bookId', async (req, res) => {
        const { bookId } = req.params;

        // get increment by id
        try {
            const value = await client.get(bookId);
            res.status(200);
            res.json({ value });
        }
        catch (error) {
            console.error(error);
        }
    });

    index.post('/:bookId/incr', async (req, res) => {
        const { bookId } = req.params;
        // increase counter
        try {
            await client.incr(bookId);
        }
        catch (error) {
            console.error(error);
        }
    });

    return index;
};
