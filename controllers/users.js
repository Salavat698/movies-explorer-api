const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const AuthorizationError = require('../errors/AuthorizationError'); // 401 ошибка авторизации
const EmailConflictError = require('../errors/ConflictError'); // 409 конфликт с сервером
const IncorrectError = require('../errors/BadRequestError'); // 400
// const ForbiddenError = require('../errors/ForbiddenErrors'); // 403
const NotFoundError = require('../errors/NotFoundError'); // 404

const { JWT_SECRET, NODE_ENV } = process.env;

// возвращает информацию о пользователе (email и имя)
module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  // console.log(userId)
  User.findById(userId)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('С данным id пользователь не найден');
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new IncorrectError('Некорректные данные');
      } else {
        next(err);
      }
    })
    .catch(next);
};
// обновляет  информацию о пользователе (email и имя)
module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError('С данным id пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectError('Некорректные данные');
      } else if (err.name === 'CastError') {
        throw new IncorrectError('С данным id пользователь не найден');
      } else {
        next(err);
      }
    })
    .catch(next);
};
// создаем пользователя
module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      },
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new IncorrectError('Некорректные данные');
      } else if (err.name === 'MongoError' && err.code === 11000) {
        throw new EmailConflictError('С таким email пользователь уже зарегистрирован');
      } else {
        next(err);
      }
    })
    .catch(next);
};
// авторизация
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'super-strong-secret-test', { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true, // запрещает доступ к куке из js
        sameSite: true,
      })
        .send({ token });
    })
    .catch((err) => next(new AuthorizationError(`Произошла ошибка: ${err.message}`)));
};
module.exports.signOut = (req, res, next) => {
  res.clearCookie('jwt', {
    sameSite: 'None',
    secure: true,
  }).send({ message: 'Куки удалены' });
  next();
};
