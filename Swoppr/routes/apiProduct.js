/**
 * Created by jonah on 11/15/2015.
 */
var express = require('express');
var router = express.Router();
var swopprCtrl = require('../data/models/product.model');
var multiparty = require('connect-multiparty'), multipartyMiddleware = multiparty();

router.get('/getById/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getProductById(req, res, id);
});

router.get('/getByIdUser/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getProductByIdUser(req, res, id);
});

router.get('/getAll', function(req, res) {
   return swopprCtrl.getAllProducts(req, res);
});

router.post('/newProduct', multipartyMiddleware, function(req, res) {
    return swopprCtrl.addProductWithPictureUser(req, res);
});

router.post('/editProduct', multipartyMiddleware, function(req, res) {
    return swopprCtrl.editProductWithPictureUser(req, res);
});

router.get('/removeById/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.softDeleteProduct(req, res, id);
});

module.exports = router;