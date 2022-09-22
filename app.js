require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const routes = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const options = {
  origin: [
    'http://localhost:3006',
    'https://kulumbegova.movies.nomorepartiesxyz.ru',
    'http://kulumbegova.movies.nomorepartiesxyz.ru',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

mongoose.connect('mongodb://localhost:27017/moviesdb');
const app = express();
app.use('*', cors(options));
app.use(express.json());
app.use(requestLogger);

app.use(routes);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
});
app.listen(PORT, () => {});
