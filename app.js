const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

// Define Routers
const indexRouter = require('./app_server/routes/index');
const apiRouter = require('./app_api/routes/index');

const handlebars = require('hbs');

// Bring in the database
require('./app_api/models/db');

// Get .env file
require ('dotenv').config();

// Wire in authentication module
var passport = require('passport');
require('./app_api/config/passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));

// Register handlebars partials (https://www.npmjs.com/package/hbs)
handlebars.registerPartials(__dirname + '/app_server/views/partials');

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// Enable CORS
app.use('/api', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

// Wire-up routes to controllers
app.use('/', indexRouter);
app.use('/api', apiRouter);

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

// Catch unauthorized error and create 401
app.use((err, req, res, next) =>{
  if(err.name === 'UnauthorizedError') {
    res
      .status(401)
      .json({'message': err.name + ": " + err.message});
  }
});

module.exports = app;
