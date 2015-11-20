/**
 * Created by jonah on 11/15/2015.
 */
 var express = require('express');
 var router = express.Router();


router.get('/', function(req, res) {
    res.render('index', { title: 'Swoppr' });
});

 router.get('/:name', function(req, res) {
     var name = req.params.name;
     res.render('partials/' + name);
 });

 module.exports = router;