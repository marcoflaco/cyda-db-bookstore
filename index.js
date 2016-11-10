const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      methodOverride = require('method-override'),
      pug = require('pug'),
      Sequelize = require('sequelize');

var app = express(),
    sequelize = new Sequelize('marcocampos', 'marcocampos', '', { dialect: 'postgres' });

var booksRouter = require('./routes/books');

// Our model definition:
var Book = sequelize.define('book', {
  title: Sequelize.STRING,
  imageURL: Sequelize.STRING,
  author: Sequelize.STRING,
  description: Sequelize.TEXT
});
// ======================

app.use(express.static('public'));

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    var method = req.body._method;
    delete req.body._method;
    return method;
  }})
);

app.set('view engine', 'pug');

app.get('/', (request, response) => {
  response.redirect('/books');
});

app.use('/books', booksRouter);

sequelize.sync().then(() => {
  console.log('Connected to database');
  app.listen(3000, () => {
    console.log('Web Server is running on port 3000');
  });
});
