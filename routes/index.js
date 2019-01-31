// /routes/index.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book.js');

router.get('/', (req, res, next) => {
  res.render('index');
});

// GET /books
router.get('/books', (req, res, next) => {
  Book.find() // Find all the books (no filter)
    .then(docs => {
      res.render("books", {
        books: docs
      });
    })
    .catch(error => {
      console.log(error)
    })
});

router.get('/book/:id', (req, res, next) => {
  let bookId = req.params.id;
  // Book.findOne({'_id': bookId})
  Book.findById(bookId)
    .then(book => {
      res.render("book-detail", { book })
    })
    .catch(error => {
      console.log(error)
    })
});
module.exports = router;
