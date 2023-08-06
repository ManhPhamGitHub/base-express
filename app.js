const createError = require('http-errors');
const express = require('express');
const cors = require("cors");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { cleanObject } = require("./utils/utils");

// connect db
require("./modules/db").connect();

const app = express();


// body request configure
app.use(express.urlencoded({ extended: true, limit: "1kb" }));
app.use(express.json({ limit: "100mb" }));

// cors configure
const corsOptions = {
  origin: "*",
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.set('trust proxy', true);

app.use(function (req, res, next) {
  req.body = cleanObject(req.body);
  next();
});

// routes
require("./routes/index")(app);

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
app.disable("x-powered-by");

module.exports = app;
