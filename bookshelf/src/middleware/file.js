const multer = require('multer');

const buildStorage = (destination = 'public') => multer.diskStorage({
    destination (req, file, cb) {
        cb(null, destination);
    },
    filename (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

module.exports = buildStorage;
