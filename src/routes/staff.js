const express = require('express');
const router = express.Router();
const logAction = require('../middleware/logger');
const { createStaff } = require('../models/staff');

router.post('/register', (req, res) => {
  const { username, password, role } = req.body;
  createStaff(username, password, role, (err, result) => {
    if (err) return res.status(500).json({ error: 'Registration failed' });
    logAction(`Staff registered: ${username}`);
    res.status(201).json({ message: 'Staff registered successfully' });
  });
});

module.exports = router;
