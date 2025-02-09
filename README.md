# Bookshelf

### Запуск
```bash
yarn start
```

### Запросы к MongoDB

- запрос(ы) для *вставки* данных минимум о двух книгах в коллекцию **books**
  ```
  bookshelf> db.books.insertOne({title: "Надзирать и наказывать: Рождение тюрьмы.", authors: "Мишел Фуко", description: "Одна из самых революционных книг по современной теории общества."})
  bookshelf> db.books.insertMany([
      {title: "The Book", authors: "Коллектив авторов", description: "Как создать цивилизацию заново"},
      {title: "Дон Кихот", authors: "Мигель де Сервантес", description: "Трагикомическая эпопея о безумном рыцаре, не боявшемся показаться смешным в своем утопическом стремлении сделать мир лучше, о надежде и отчаянии, мудрости и сумасбродстве."},
    ])
  ```
- запрос для *поиска* полей документов коллекции **books** по полю *title*
  ```
  bookshelf> db.books.find({title: "The Book"}, {title: true, authors: true})
  ```
- запрос для *редактирования* полей: *description* и *authors* коллекции **books** по *_id* записи
  ```
  bookshelf> db.books.updateOne({_id: ''}, {$set: {description : "new_description", authors: "new_authors"}}) 
  ```