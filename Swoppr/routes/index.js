/*module.exports = function(req, res, next) {
  res.render('index', { title: 'Express' });
};

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { title: 'Swoppr' });
});

module.exports = router;*/

module.exports = function(req, res, next) {
  res.render('index', { title: 'Swoppr' });
};