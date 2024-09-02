const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateToken = (staff) => {
  const payload = { id: staff.id, username: staff.username, role: staff.role };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Unauthorized! Invalid token.' });
    }
    
    req.userId = decoded.id;
    req.username = decoded.username;
    req.role = decoded.role;
    next();
  });
};

module.exports = {generateToken,
  verifyToken
};
