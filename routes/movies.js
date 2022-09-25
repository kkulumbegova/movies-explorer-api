const router = require('express').Router();
const { createMovie, getMovies, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, movieIdValidation } = require('../middlewares/validation');

router.post('/movies', createMovieValidation, createMovie);
router.get('/movies', getMovies);
router.delete('/movies/:movieId', movieIdValidation, deleteMovie);

module.exports = router;
