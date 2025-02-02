const express         = require('express');
const errorMiddleware = require('./middleware/error');
const apiUserRouter   = require('./routes/api/user/user.router');
const apiBooksRouter  = require('./routes/api/book/book.router');
const indexRouter     = require('./routes/view/index.router');
const bookRouter      = require('./routes/view/book/book.router');
const Store           = require('./model/Store.js');

const store = new Store();
const app   = express();

app.use(express.urlencoded());
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/', indexRouter(store));
app.use('/book', bookRouter(store));

app.use(express.json());
app.use('/api/user', apiUserRouter);
app.use('/api/books', apiBooksRouter(store));


app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
