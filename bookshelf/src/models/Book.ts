import { Schema, model, Model } from 'mongoose';
import type IBook from './IBook.ts';

const BookSchema: Schema = new Schema<IBook>({
    title      : { type: String, required: true },
    authors    : { type: String, required: true },
    description: { type: String, default: '' },
    fileCover  : { type: String, default: '' },
    fileName   : { type: String, default: '' },
    fileBook   : { type: String, default: '' },
    favorite   : { type: Boolean, default: false },
}, {
    timestamps: true
})

export function createBookModel(): Model<IBook> {
    return model<IBook>('Book', BookSchema);
}

export type BookModelType = Model<IBook>;
