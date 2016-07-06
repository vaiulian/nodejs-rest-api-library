var BookModel = require('./bookModel');


var books = {
    createBook: function(req, res) {
        var book = new BookModel();

        book.title = req.body.title || "Exemple book vol.1";
        book.author = req.body.author || "Exemple Author";
        book.year = req.body.year || 2016;
        book.save(function(err) {

            if (err) {
                res.status(401);
                res.json({ message: err });
              }
            res.status(200);
            res.json({ message: 'Book created!', book: book });
        });
    },
    getAllBooks: function(req, res) {
      BookModel.find(function(err, books) {
          if (err)
              res.json({ message: err });
          res.status(200);
          res.json(books);
      });
    },
    getOneBook: function(req, res) {
        var id = req.params.id;
        BookModel.findById(id, function(err, book) {
            if (err)
                res.json({ message: err });
            res.status(200);
            res.json(book);
        });
    },
    updateBook: function(req, res) {
        var id = req.params.id;
        BookModel.findById(id, function(err, book) {

            if (err)
                res.json({ message: err });
                
            book.title = req.body.title || book.title;
            book.author = req.body.author || book.author;
            book.year = req.body.year || book.year;

            book.save(function(err) {
                if (err)
                    res.json({ message: err });
                res.status(200);
                res.json({ message: 'Book updated!', book: book });
            });

        });
    },
    deleteBook: function(req, res) {
        var id = req.params.id;
        BookModel.remove({ _id: id }, function(err, book) {
            if (err)
                res.send(err);

            res.status(200);
            res.json({ message: 'Successfully deleted Book', book: book });
        });
    }
};

module.exports = books;
