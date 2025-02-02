const express     = require('express');
const router      = require('./router');
const redisClient = require('./redisClient');

(async () => {
    await redisClient.connect();
})();

const app   = express();
app.use(express.json());
app.use('/counter', router(redisClient));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Counter started on port ${PORT}!`);
});
