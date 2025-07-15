import express    from 'express';
import type Store from '../../models/Store';

const router = express.Router();

export default (store: Store) => {
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
            /*const newBook = new Book({
                                         title,
                                         authors,
                                         description,
                                     });
            store.addBook(newBook);

            res.status(201);
            res.redirect(`/book/${ newBook.id }`);*/
        }
        else {
            res.status(400);
        }
    });

    return router;
};
