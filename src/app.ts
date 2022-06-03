import * as createError from 'http-errors';
import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import { ResponseError } from './types';

import indexRouter from './routes/index';
import userRouterAPI from './routes/api/user';

import 'dotenv/config';
import mongoose from 'mongoose';

const app = express();

const mongodb = process.env.DBCONNECTION!;
mongoose.connect(mongodb);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/api', userRouterAPI);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: ResponseError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.message);
});

export default app;
