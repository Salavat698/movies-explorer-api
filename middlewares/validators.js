const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  }),
});

const validateSignUp = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(isURL),
  }),
});

const validateSignIn = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const updateProfileValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
  }),
});

const getMoviesValidation = celebrate({
  body: Joi.object,
});

const deleteMovieValidation = celebrate({
  params: Joi.object().keys({
    moviesId: Joi.string().length(24).hex(),
  }),
});

const createMovieValidation = celebrate({
  body:
  Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    trailerLink: Joi.string().required().custom(isURL),
    owner: Joi.string().required(),
    id: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports = {
  createUserValidation,
  validateSignUp,
  validateSignIn,
  updateProfileValidation,
  getMoviesValidation,
  deleteMovieValidation,
  createMovieValidation,
};
