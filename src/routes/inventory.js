const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/low-stock', (req, res) => {
  const query = 'SELECT * FROM books WHERE quantity < 5';
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve low-stock books' });
    res.status(200).json(results);
  });
});

module.exports = router;
