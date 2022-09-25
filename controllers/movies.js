const Movie = require('../models/movie');
const NotFound = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');
const ValidationError = require('../errors/validation-err');

const createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  return Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Некорректные данные при создании фильма'));
      } else {
        next(err);
      }
    });
};

const getMovies = (req, res, next) => Movie.find({})
  .then((movies) => {
    if (movies.length === 0) {
      res.send({ message: 'Нет сохраненных фильмов' });
    }
    res.send(movies);
  })
  .catch(next);

const deleteMovie = (req, res, next) => {
  const id = req.params.movieId;
  Movie.findById(id)
    .orFail(() => new NotFound('Нет фильма по заданному id'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Невозможно удалить чужой сохраненный фильм'));
      }
      return movie.remove();
    })
    .then(() => res.send({ message: 'Фильм удален из сохраненных' }))
    .catch(next);
};

module.exports = { createMovie, getMovies, deleteMovie };
