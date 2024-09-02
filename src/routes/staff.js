const express = require('express');
const router = express.Router();
const logAction = require('../middleware/logger');
const { createStaff } = require('../models/staff');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const dotenv = require('dotenv');


dotenv.config();

router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  createStaff(username, password, role, (err, result) => {
    if (err) return res.status(500).json({ error: 'Registration failed' });
    logAction(`Staff registered: ${username}`);
    res.status(201).json({ message: 'Staff registered successfully' });
  });
});

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Query to find the user by username
  const query = 'SELECT * FROM staff WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database query failed' });
    if (results.length === 0) return res.status(401).json({ error: 'Invalid username or password' });

    const user = results[0];

    // Compare the provided password with the hashed password stored in the database
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) return res.status(500).json({ error: 'Error comparing passwords' });
      if (!isMatch) return res.status(401).json({ error: 'Invalid username or password' });

      // Generate a JWT token if the password matches
      const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

      logAction(`User logged in: ${username}`);

      res.status(200).json({ message: 'Login successful', token });
    });
  });
});


module.exports = router;
