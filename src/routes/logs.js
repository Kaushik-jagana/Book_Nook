const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/:staffId/last-actions', (req, res) => {
  const staffId = req.params.staffId;
  const logFilePath = path.join(__dirname, '..', 'logs', 'actions.log');

  fs.readFile(logFilePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Failed to retrieve logs' });

    const actions = data.split('\n').filter(line => line.includes(`Staff ID: ${staffId}`));
    const lastActions = actions.slice(-10).reverse();

    res.status(200).json(lastActions);
  });
});

module.exports = router;
