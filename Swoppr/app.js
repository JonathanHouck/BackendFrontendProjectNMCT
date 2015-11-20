var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var partials = require('./routes/partials');

var api = require('./routes/api');
var apiProduct = require('./routes/apiProduct.js');
var apiUser = require('./routes/apiUser.js');
var apiRenting = require('./routes/apiRenting.js');

var app = express();

// Mongoose ODM...
var mongoose = require('mongoose');

// Connect to MongoDB...
//mongoose.connect('mongodb://demo:standup123@ds052827.mongolab.com:52827/standupmeetingnotes');
mongoose.connect('mongodb://johna:swoppr@ds053774.mongolab.com:53774/swoppr');

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

app.use('/partials', partials);

app.use('/api/product', apiProduct);
app.use('/api/user', apiUser);
app.use('/api/renting', apiRenting);

/*app.get('/api/posts', api.posts);
app.get('/api/post/:id', api.post);
app.post('/api/post', api.addPost);
app.put('/api/post/:id', api.editPost);
app.delete('/api/post/:id', api.deletePost);*/

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
