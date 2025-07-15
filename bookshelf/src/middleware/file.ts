import * as multer from 'multer';

export default (destination = 'public') => multer.diskStorage(
    {
        destination (req, file, cb) {
            cb(null, destination);
        },
        filename (req, file, cb) {
            cb(
                null,
                `${ Date.now() }-${ file.originalname }`,
            );
        },
    },
);
