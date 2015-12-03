/**
 * Created by jonah on 11/15/2015.
 */
var express = require('express');
var router = express.Router();
var swopprCtrl = require('../data/models/product.model');

router.get('/getById/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getProductById(req, res, id);
});

router.get('/getByIdUser/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getProductByIdUser(req, res, id);
});

router.post('/newProduct', function(req, res) {
    return swopprCtrl.addProductUser(req, res);
});

router.get('/getAll', function(req, res) {
   return swopprCtrl.getAllProducts(req, res);
});

router.get('/removeProductUser/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.removeProductUser(req, res, id);
});

router.post('/editProductUser', function(req, res) {
    return swopprCtrl.editProductUser(req, res);
});

module.exports = router;