const createError = require('http-errors');
const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config({ path: '.env' });
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const connectDB = require('./db');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

connectDB();

const indexRouter = require('./routes/index');
const clientRouter = require('./routes/client');
const generalRouter = require('./routes/general');
const managementRouter = require('./routes/management');
const salesRouter = require('./routes/sales');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/client', clientRouter);
app.use('/general', generalRouter);
app.use('/management', managementRouter);
app.use('/salesRouter', salesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
