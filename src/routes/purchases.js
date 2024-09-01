const express = require('express');
const router = express.Router();
const { getBookByISBN, updateBookQuantity } = require('../models/book');
const logAction = require('../middleware/logger');

const queue = [];
let processing = false;

const processQueue = () => {
  if (processing || queue.length === 0) return;
  processing = true;
  const { req, res } = queue.shift();
  handlePurchase(req, res, () => {
    processing = false;
    processQueue();
  });
};

const handlePurchase = (req, res, callback) => {
  const { isbn, quantity } = req.body;
  getBookByISBN(isbn, (err, book) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve book' });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    if (book.quantity < quantity) {
      return res.status(400).json({ message: 'Not enough stock' });
    }

    const newQuantity = book.quantity - quantity;
    updateBookQuantity(isbn, newQuantity, (err, result) => {
      if (err) return res.status(500).json({ error: 'Failed to update book quantity' });
      logAction(`Book purchased: ${isbn} - Quantity: ${quantity}`);
      res.status(200).json({ message: 'Purchase successful', remainingStock: newQuantity });
      callback();
    });
  });
};

router.post('/purchase', (req, res) => {
  queue.push({ req, res });
  processQueue();
});

module.exports = router;