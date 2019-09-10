const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

// ADD/POST a book
router.post('', bookController.saveBook);
// GET All Books
router.get('', bookController.getBooks);
// UPDATE/PATCH a book
router.patch('/:id', bookController.updateBook);
// DELETE book
router.delete('/:id', bookController.deleteBook);

module.exports = router;
