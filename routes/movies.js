const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  getMoviesValidation,
  deleteMovieValidation,
  createMovieValidation,
} = require('../middlewares/validators');

router.get('/movies', getMoviesValidation, getMovies);
router.post('/movies', createMovieValidation, createMovie);
router.delete('/movies/:moviesId', deleteMovieValidation, deleteMovie);

module.exports = router;
