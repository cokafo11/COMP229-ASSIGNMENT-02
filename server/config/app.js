/*Name: Caleb Okafor (301151683)
  Course: COMP229 Assignment 01
  Date: Feb 12, 2022.
  Description: Main JavaScript file of the application. */

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require('mongoose');
let DB = require('./db');

//modules for authentication
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

//creating an event to enable mongoo connect to the database
//mongoose.connect(DB.URI, {useNewUrlParser:true, useUnifiedtopology:true});
mongoose.connect(DB.URI);
let mongoDB = mongoose.connection;

//handle errors
mongoDB.on('error', console.error.bind(console, 'Connection Error: '));

//if no errors
mongoDB.once('open', () => {
  console.log('connected to MongoDB...');
});
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactsRouter = require('../routes/contact');

let app = express();

// view folder configuration
app.set('views', path.join(__dirname, '../views'));
//configuration of template engine
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
//app.use('/contactList', contactsRouter)
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

app.use(flash());

//Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//passport configuration
//create a user model instance

let userModel = require('../models/user');
let User = userModel.User;
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contactList', contactsRouter);



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
  res.render('error', {title: 'Error'});
  //res.render('error');
});

module.exports = app;