const express = require('express');
const router = express.Router();
const pool = require('../modules/pool')

router.get('/:movieId', (req, res) => {
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

module.exports = router;