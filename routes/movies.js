const router = require('express').Router();
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
// const { validateCreateCard, validateCardId } = require('../middlewares/validators');

router.get('/movies', getMovies);
router.post('/movies', createMovie);
router.delete('/movies/:moviesId', deleteMovie);

module.exports = router;
