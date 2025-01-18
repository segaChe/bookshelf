const express      = require('express');
const { v4: uuid } = require('uuid');

const Store = require('./Store.js');
const Book  = require('./Book.js');

const store = new Store();

const app = express();
app.use(express.json());

app.post('/api/user/login', (req, res) => {
    res.status(201);
    res.json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (req, res) => {
    res.json(store.getBooks());
});

app.get('/api/books/:id', (req, res) => {
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

app.post('/api/books/', (req, res) => {
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

app.put('/api/books/:id', (req, res) => {
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

app.delete('/api/books/:id', (req, res) => {
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

const PORT = process.env.PORT || 3000;
app.listen(PORT);
