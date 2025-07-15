import { Document } from 'mongoose';

interface Book extends Document {
    title : string,
    authors : string,
    description? : string,
    fileCover? : string,
    fileName? : string,
    fileBook? : string,
    favorite? : boolean,
    createdAt : Date,
    updatedAt : Date,
}

export default Book;
