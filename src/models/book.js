const db = require('../config/db');

const createBook = (title, author, genre, isbn, price, quantity, callback) => {
  const query = 'INSERT INTO books (title, author, genre, isbn, price, quantity) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [title, author, genre, isbn, price, quantity], (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

const getAllBooks = (callback) => {
  const query = 'SELECT * FROM books';
  db.query(query, (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

const getBookByISBN = (isbn, callback) => {
  const query = 'SELECT * FROM books WHERE isbn = ?';
  db.query(query, [isbn], (error, results) => {
    if (error) return callback(error);
    callback(null, results[0]);
  });
};

const updateBookQuantity = (isbn, quantity, callback) => {
  const query = 'UPDATE books SET quantity = ? WHERE isbn = ?';
  db.query(query, [quantity, isbn], (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

module.exports = {
  createBook,
  getAllBooks,
  getBookByISBN,
  updateBookQuantity
};
