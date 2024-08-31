const express = require('express');
const app = express();
const db = require('./config/db');
const logRoutes = require('./routes/logs');
const staffRoutes = require('./routes/staff');
const bookRoutes = require('./routes/books');
const purchaseRoutes = require('./routes/purchases');
const inventoryRoutes = require('./routes/inventory');


// Middleware
app.use(express.json());

app.use('/api/staff', staffRoutes);
app.use('/api/logs', logRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/inventory', inventoryRoutes);


// Test route
app.get('/', (req, res) => {
  res.send('Welcome to The Book Nook API!');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
