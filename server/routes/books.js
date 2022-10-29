// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
const books = require('../models/books');

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

    /*****************/
    res.render('books/add', {title: 'Add Book', books: books})
    /*****************/

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************/
    let newBook = books({
      "tittle": req.body.title,
      "description": req.body.description,
      "price": req.body.price,
      "author": req.body.author,
      "genre": req.body.genre
     });

     books.create(newBook, (err, books) =>{
        if(err)
        {
          console.log(err);
          res.end(err);
        }
        else
        {
          res.redirect('/books')
        }
     });
    /*****************/

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************/
    let id = req.params.id;

    book.findById(id, (err, editBook) =>{
       if(err)
       {
         console.log(err);
         res.end(err);
       }
       else
       {
         //Show edit view
         res.render('books/edit', {title: 'Edit Book', books: editBook})
       }
    });
   /*****************/
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************/
    let id = req.params.id;

    let updatedBook = book({
     "_id": id,
     "tittle": req.body.title,
     "description": req.body.description,
     "price": req.body.price,
     "author": req.body.author,
     "genre": req.body.genre

    });


    book.updateOne({_id: id}, updatedBook, (err) => {
       if(err)
       {
         console.log(err);
         res.end(err);
       }
       else
       {
         res.redirect('/books');
       }
    });

   /*****************/

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************/
    let id = req.params.id

    book.remove({_id: id}, (err) => {
     if(err)
       {
         console.log(err);
         res.end(err);
       }
       else
       {
         res.redirect('/books')
       }
    });
   /*****************/
});


module.exports = router;
