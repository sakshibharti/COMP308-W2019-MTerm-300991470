// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
                                       //Sakshi Bharti (300991470)-BooksList
// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {
  let newBook = book({
    Title: "",
    Description: "",
    Price: "",
    Author: "",
    Genre: ""
  });
  res.render("books/details", {
    title: "Add New Book",
    books: newBook
  });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
  let newBook = book({
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });
  console.log(newBook);
  book.create(newBook, (err, book) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

  let bookId = req.params.id;
  book.findById(bookId, (err, DBbook) => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.render("books/details", {
        title: "Update the Book",
        books: DBbook
      });
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {
  let bookId = req.params.id;
  let updateBook = book({
    _id: bookId,
    Title: req.body.title,
    Description: req.body.description,
    Price: req.body.price,
    Author: req.body.author,
    Genre: req.body.genre
  });

  book.update({ _id: bookId }, updateBook, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let bookId = req.params.id;
  console.log(bookId);
  book.remove({ _id: bookId }, err => {
    if (err) {
      console.log(err);
      res.end(err);
    } else {
      res.redirect("/books");
    }
  });
});


module.exports = router;
