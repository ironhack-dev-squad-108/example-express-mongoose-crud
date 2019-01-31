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

// NEW
router.get('/books/add', (req, res, next) => {
  res.render("book-add");
});

// NEW
router.post('/books/add', (req, res, next) => {
  console.log(req.body)
  const { title,author,description,rating } = req.body
  // The same as
  // const title = req.body.title
  // const author = req.body.author
  // ...

  const newBook = new Book({title,author,description,rating});
  newBook.save()
  .then((book) => {
    res.redirect('/books');
  })
  .catch((error) => {
    console.log(error);
    res.redirect('/books/add');
  })
});

router.get('/books/edit', (req, res, next) => {
  Book.findOne({_id: req.query.book_id})
  .then((book) => {
    res.render("book-edit", {book});
  })
  .catch((error) => {
    console.log(error);
  })
});

router.post('/books/edit', (req, res, next) => {
  const { title, author, description, rating } = req.body;
  const _id = req.query.book_id
  // Book.update({_id: _id}, { $set: {title, author, description, rating }})
  // .then((book) => {
  //   res.redirect('/books');
  // })
  // .catch((error) => {
  //   console.log(error);
  // })
  Book.findByIdAndUpdate(_id, {title,author,description,rating})
  .then((book) => {
    res.redirect('/books');
  })
  .catch((error) => {
    console.log(error);
  })
});

router.get('/books/delete/:id', (req,res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/books'))
    .catch(err => {
      console.log('An error happened', err)
      res.render('error')
    })
})


module.exports = router;
