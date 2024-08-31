const db = require('../config/db');
const bcrypt = require('bcrypt');

const createStaff = (username, password, role, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) return callback(err);
    const query = 'INSERT INTO staff (username, password, role) VALUES (?, ?, ?)';
    db.query(query, [username, hash, role], (error, results) => {
      if (error) return callback(error);
      callback(null, results);
    });
  });
};

module.exports = {
  createStaff
};
