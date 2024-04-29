const express = require('express');
const cors = require('cors'); // Import the cors package
const productRoutes = require('./routes/movieRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Routes
app.use('/api/movies', productRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));