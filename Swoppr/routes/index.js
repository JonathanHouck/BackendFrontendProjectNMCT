module.exports.index = function(req, res, next) {
  res.render('index', { title: 'Express' });
};

module.exports.partials = function(req, res, next) {
  var name = req.params.name;
  res.render('partials/' + name);
};

