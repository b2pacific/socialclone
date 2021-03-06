var createError = require('http-errors');
var express = require('express');
var path = require('path');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const registrationRouter = require('./routes/registration');
const tweetsRouter = require('./routes/tweet');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const dashboardRouter = require('./routes/dashboard');
const friendRouter = require('./routes/friends');
const exploreRouter = require('./routes/explore');

var app = express();

const connect = mongoose.connect("mongodb://localhost:27017/twitter", {useNewUrlParser: true});

connect.then(function (db) {
  console.log("Connected correctly to server");
}, (err) => {
  console.log(err);
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', dashboardRouter)
app.use('/register', registrationRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/tweet', tweetsRouter);
app.use('/friends', friendRouter);
app.use('/explore', exploreRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
