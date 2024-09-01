const express = require('express');
const app = express();
const db = require('./config/db');
const logRoutes = require('./routes/logs');
const staffRoutes = require('./routes/staff');
const bookRoutes = require('./routes/books');
const purchaseRoutes = require('./routes/purchases');
const inventoryRoutes = require('./routes/inventory');
const cors = require('cors');


app.use(cors({
    origin: 'http://localhost:3001',  // Allow requests from the React frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow these HTTP methods
    credentials: true,  // Allow credentials such as cookies
    optionsSuccessStatus: 200  // Some legacy browsers (e.g., IE11) choke on 204
  }));

  
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
