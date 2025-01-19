const express        = require('express');
const { v4: uuid }   = require('uuid');
const apiUserRouter  = require('./routes/api/user.js');
const apiBooksRouter = require('./routes/api/books.js');
const Store          = require('./Store.js');

const store = new Store();
const app   = express();

app.use(express.json());
app.use('/api/user', apiUserRouter);
app.use('/api/books', apiBooksRouter(store));

const PORT = process.env.PORT || 3000;
app.listen(PORT);
