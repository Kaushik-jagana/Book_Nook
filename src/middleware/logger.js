const fs = require('fs');
const path = require('path');

const logAction = (action) => {
  const logFilePath = path.join(__dirname, '..', 'logs', 'actions.log');
  const logMessage = `${new Date().toISOString()} - ${action}\n`;

  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) console.error('Failed to log action:', err);
  });
};

module.exports = logAction;
