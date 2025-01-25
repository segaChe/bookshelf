const express         = require('express');
const errorMiddleware = require('./middleware/error');
const apiUserRouter  = require('./routes/api/user.js');
const apiBooksRouter = require('./routes/api/books.js');
const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const Store       = require('./Store.js');

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
