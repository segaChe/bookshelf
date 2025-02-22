const { Schema, model } = require('mongoose');

const BookSchema = new Schema({
    title      : { type: String, required: true },
    authors    : { type: String, required: true },
    description: { type: String, default: '' },
    fileCover  : { type: String, default: '' },
    fileName   : { type: String, default: '' },
    fileBook   : { type: String, default: '' },
    favorite   : { type: Boolean, default: false },
})

module.exports = model('Book', BookSchema);
