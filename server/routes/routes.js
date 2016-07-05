var express = require('express');
var auth = require('../middleware/auth/auth.js');
var books = require('../models/books.js');

var router = express.Router();
/*
* Routes that can be accessed by any one
*/

router.post('/login', auth.login);
/*
* Routes that can be accessed only by autheticated users
*/
router.get('/api/books', books.getAllBooks);
router.post('/api/books/', books.createBook);
router.get('/api/books/:id', books.getOneBook);
router.put('/api/books/:id', books.updateBook);
router.delete('/api/books/:id', books.deleteBook);

module.exports = router;
