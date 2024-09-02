const express = require('express');
const router = express.Router();
const logAction = require('../middleware/logger');
const db = require('../config/db');  // Import the db connection

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
  const genre = req.query.genre || null;

  let query = 'SELECT * FROM books';
  const params = [];

  // If a genre is provided, add it to the query
  if (genre) {
    query += ' WHERE genre = ?';
    params.push(genre);
  }

  // Add pagination to the query
  query += ' LIMIT ? OFFSET ?';
  params.push(limit, offset);

  db.query(query, params, (err, results) => {
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
