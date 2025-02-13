const { v4: uuid } = require('uuid');

class Book {
    constructor (
        {
            title,
            authors,
            description = '',
            favorite = false,
            fileCover = '',
            fileName = '',
            fileBook = '',
        },
        id = uuid(),
    ) {
        // так как id уникальны и книги не сохраняются добавлен новый формат id для проверки
        this.id          = `${title.toLowerCase().trim()}_${authors.toLowerCase().trim()}` ; // id;
        this.title       = title;
        this.description = description;
        this.authors     = authors;
        this.favorite    = favorite;
        this.fileCover   = fileCover;
        this.fileName    = fileName;
        this.fileBook    = fileBook;

    }
}

module.exports = Book;
