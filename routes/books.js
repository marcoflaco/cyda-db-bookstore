const express = require('express'),
      Sequelize = require('sequelize'),
      router = express.Router();

const sequelize = new Sequelize('marcocampos', 'marcocampos', '', { dialect: 'postgres' });

// Our model definition:
var Book = sequelize.define('book', {
  title: Sequelize.STRING,
  imageURL: Sequelize.STRING,
  author: Sequelize.STRING,
  description: Sequelize.TEXT
});
// ======================

router.get('/', (request, response) => {
  Book.findAll({ order: 'id ASC' }).then((books) => {
    response.render('books/index', { books: books });
  });
});

router.post('/', (request, response) => {
  if (request.body.title) {
    Book.create(request.body).then(() => {
      response.redirect('/books');
    });
  } else {
    response.redirect('/books/new');
  }
});

router.get('/new', (request, response) => {
  response.render('books/new');
});

router.get('/:id', (request, response) => {
  Book.findById(request.params.id).then((book) => {
    response.render('books/show', { book: book });
  });
});

router.get('/:id/edit', (request, response) => {
  Book.findById(request.params.id).then((book) => {
    response.render('books/edit', { book: book });
  });
});

router.delete('/:id', (request, response) => {
  Book.destroy({
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/books');
  });
});

router.put('/:id', (request, response) => {
  Book.update(request.params, {
    where: {
      id: request.params.id
    }
  }).then(() => {
    response.redirect('/books/' + request.params.id);
  });
});

module.exports = router;
