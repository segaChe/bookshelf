const express  = require('express');
const mongoose = require('mongoose');

const errorMiddleware = require('./middleware/error');
const apiUserRouter   = require('./routes/api/user/user.router');
const apiBooksRouter  = require('./routes/api/book/book.router');
const indexRouter     = require('./routes/view/index.router');
const bookRouter      = require('./routes/view/book/book.router');

const Store            = require('./models/Store.js');
const CounterConnector = require('./Connectors/CounterConnector');

const store            = new Store();
const counterConnector = new CounterConnector({
    baseUrl: process.env.COUNTER_URL,
    port   : process.env.COUNTER_PORT,
});

const app = express();

app.use(express.urlencoded());
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use('/', indexRouter(store));
app.use('/book', bookRouter(store, counterConnector));

app.use(express.json());
app.use('/api/user', apiUserRouter);
app.use('/api/books', apiBooksRouter());


app.use(errorMiddleware);

async function start (PORT, UrlDB) {
    try {
        await mongoose.connect(UrlDB);
        app.listen(PORT);
    }
    catch (e) {
        console.log(e);
    }
}

const UrlDB = process.env.MONGO_DB_URL;
const PORT  = process.env.PORT || 3000;
start(PORT, UrlDB);
