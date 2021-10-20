const Movie = require('../models/movies');

const IncorrectError = require('../errors/BadRequestError'); // 400
const ForbiddenError = require('../errors/ForbiddenErrors'); // 403
const NotFoundError = require('../errors/NotFoundError'); // 404

// возвращает все сохранённые пользователем фильмы
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};
// создаёт фильм с переданными в теле
module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectError('Некорректные данные при создании видео');
      } else {
        next(err);
      }
    })
    .catch(next);
};
//  удаляет сохранённый фильм по id
module.exports.deleteMovie = (req, res, next) => {
  const { moviesId } = req.params;
  const userId = req.user._id;

  Movie.findById(moviesId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Видео с указанным id не найдена');
      }
      if (card.owner.toString() !== userId) {
        next(new ForbiddenError('У Вас недостаточно прав для удаления Видео'));
        return;
      }
      card.deleteOne();
      res.send({ card });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new IncorrectError('Видео с указанным id не найдена');
      } else {
        next(err);
      }
    })
    .catch(next);
};
