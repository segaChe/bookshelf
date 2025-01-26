const buildStorage = require('./file');
const multer = require('multer');

module.exports = multer({ storage: buildStorage('public/books') });
