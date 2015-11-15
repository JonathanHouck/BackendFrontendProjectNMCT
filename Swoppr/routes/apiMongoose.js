/**
 * Created by jonah on 11/15/2015.
 */
var express = require('express');
var router = express.Router();
var productsCtrl = require('../controllers/products.controller');

router.post('/newProduct', function(req, res) {
    return productsCtrl.create(req, res);
});

module.exports = router;

/*var productsCtrl = require('../controllers/products.controller');

exports.addPost = function (req, res) {
    return productsCtrl.create(req, res);
};*/
