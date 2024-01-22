require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');

const { PORT = 3000 } = process.env;

const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();
app.use(cors());

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const { validateUserLogin, validateUserRegister } = require('./utils/validation');
const authGuard = require('./middlewares/auth');
const NotFound = require('./utils/error-response/NotFound');
const errorHandler = require('./middlewares/error-handler');

const mongoDB = 'mongodb://127.0.0.1:27017/mestodb';
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB);

app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', validateUserLogin, login);
app.post('/signup', validateUserRegister, createUser);

app.use('/users', authGuard, userRouter);
app.use('/cards', authGuard, cardRouter);

app.use('*', (req, res, next) => {
  next(new NotFound('Запрашиваемая страница не найдена'));
});

app.use(errorLogger);
app.use(errorHandler);
app.use(errors());

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Сервер успешно запущен');
});
