const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

// Get specific movie's genres using a many to many data relationship 
router.get('/:movieId', (req, res) => {
  // This join could have done more work, rather than separating a specific movie GET route in both the movie and genre routers
  // It could have selected all the needed information going onto the DOM in one join
  // Same functionality in the end
  const queryText = `
    SELECT "genres"."name" FROM "genres" 
    JOIN "movies_genres" ON "genres"."id" = "movies_genres"."genres_id"
    WHERE "movies_id" = ${req.params.movieId};`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error getting specific movie from DB', error);
    res.sendStatus(500);
  })
})

// Get all genres for the dropdown menu in the form
router.get('/', (req, res) => {
  const queryText = 'SELECT * FROM genres';
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log('Error getting movies from DB', error);
    res.sendStatus(500);
  })
})

module.exports = router;