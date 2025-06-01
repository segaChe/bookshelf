import 'reflect-metadata';
import express from 'express';
import * as mongoose from 'mongoose';

import errorMiddleware from './middleware/error';
import apiUserRouter from './routes/api/user/user.router';
import apiBooksRouter from './routes/api/book/book.router';
import indexRouter from './routes/view/index.router';
import bookRouter from './routes/view/book/book.router';

import Store from './models/Store';
import CounterConnector from './Connectors/CounterConnector';

const store            = new Store();
const counterConnector = new CounterConnector({
    baseUrl: process.env.COUNTER_URL,
    port   : Number(process.env.COUNTER_PORT),
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

async function start (PORT: any, UrlDB: any) {
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
start(PORT, UrlDB)
    .then (r => {
        console.log('Started!');
    });
