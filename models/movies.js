const mongoose = require('mongoose');
const { isURL } = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate(v) {
      if (!isURL(v)) {
        throw new Error('Неправильный формат url');
      }
    },
  },
  trailer: {
    type: String,
    required: true,
    validate(v) {
      if (!isURL(v)) {
        throw new Error('Неправильный формат url');
      }
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate(v) {
      if (!isURL(v)) {
        throw new Error('Неправильный формат url');
      }
    },
  },
  owner: {
    type: String,
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },

  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('Movie', movieSchema);
