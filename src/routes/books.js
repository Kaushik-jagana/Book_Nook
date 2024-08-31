const express = require('express');
const router = express.Router();
const logAction = require('../middleware/logger');

const { createBook, getAllBooks, getBookByISBN } = require('../models/book');

// Route to add a new book
router.post('/add', (req, res) => {
  const { title, author, genre, isbn, price, quantity } = req.body;
  createBook(title, author, genre, isbn, price, quantity, (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to add book' });
    logAction(`Book Added: ${title}`);
    res.status(201).json({ message: 'Book added successfully' });
  });
});

// Route to get all books
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * limit;
  
    const query = 'SELECT * FROM books LIMIT ? OFFSET ?';
    db.query(query, [limit, offset], (err, results) => {
      if (err) return res.status(500).json({ error: 'Failed to retrieve books' });
      res.status(200).json(results);
    });
  });

// Route to get a book by ISBN
router.get('/:isbn', (req, res) => {
  const { isbn } = req.params;
  getBookByISBN(isbn, (err, book) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve book' });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.status(200).json(book);
  });
});

module.exports = router;
