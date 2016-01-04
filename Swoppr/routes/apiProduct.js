/**
 * Created by jonah on 11/15/2015.
 */
var express = require('express');
var router = express.Router();
var ProductsRepo = require('../data/models/productsRepo');
var multiparty = require('connect-multiparty'), multipartyMiddleware = multiparty();

router.get('/getById/:id', function(req, res) {
    var id = req.params.id;
    return ProductsRepo.getProductById(req, res, id);
});

router.get('/getByIdUser/:id', function(req, res) {
    var id = req.params.id;
    return ProductsRepo.getProductByIdUser(req, res, id);
});

router.get('/getAll', function(req, res) {
   return ProductsRepo.getAllProducts(req, res);
});

router.post('/newProduct', multipartyMiddleware, function(req, res) {
    return ProductsRepo.addProductWithPictureUser(req, res);
});

router.post('/editProduct', multipartyMiddleware, function(req, res) {
    return ProductsRepo.editProductWithPictureUser(req, res);
});

router.get('/removeById/:id', function(req, res) {
    var id = req.params.id;
    return ProductsRepo.softDeleteProduct(req, res, id);
});

module.exports = router;