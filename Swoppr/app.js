var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var passport = require('passport');
var session = require('express-session');

var partials = require('./routes/partials')(passport);
var apiProduct = require('./routes/apiProduct.js');
var apiUser = require('./routes/apiUser.js');
var apiRenting = require('./routes/apiRenting.js');
var apiChat = require('./routes/apiChat.js');
var apiFileUpload = require('./routes/apiFileUpload');

var app = express();
require('./config/passport')(passport); // pass passport for configuration

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'gregsteristheboss', resave: true, saveUninitialized: true })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/partials', partials);


app.use('/api/product', apiProduct);
app.use('/api/user', apiUser);
app.use('/api/renting', apiRenting);
app.use('/api/chat', apiChat);
app.use('/api/fileUpload', apiFileUpload);

app.use('*', partials);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
