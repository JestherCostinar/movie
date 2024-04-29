const express = require('express');
const router = express.Router();
const db = require('../config/database');

// Get all movies
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM tbl_movie');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Get movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const [rows] = await db.query('SELECT * FROM tbl_movie WHERE id = ?', [movieId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.json(rows[0]); // Assuming there's only one tool with the given ID
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Add a new movie
router.post('/', async (req, res) => {
  try {
    const { title, description, price, link, image } = req.body;
    await db.query('INSERT INTO tbl_movie (title, description, price, link, image) VALUES (?, ?, ?, ?, ?)', [title, description, price, link, image]);
    res.json({ message: 'Movie added successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' }); // Send error message as JSON
  }
});



// Update movie by ID
router.put('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const { name, description, price,link, image } = req.body;
    
    // Check if the movie exists
    const [existingMovie] = await db.query('SELECT * FROM tbl_movie WHERE id = ?', [movieId]);
    if (existingMovie.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Update the movie
    await db.query('UPDATE tbl_movie SET title = ?, description = ?, price = ?, link = ?, image = ? WHERE id = ?', [name, description, price, link, image, toolId]);
    
    res.json({ message: 'Movie updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// Delete tool by ID
router.delete('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    
    // Check if the tool exists
    const [existingMovie] = await db.query('SELECT * FROM tbl_movie WHERE id = ?', [movieId]);
    if (existingMovie.length === 0) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    // Delete the movie
    await db.query('DELETE FROM tbl_movie WHERE id = ?', [movieId]);
    
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;