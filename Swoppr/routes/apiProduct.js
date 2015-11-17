/**
 * Created by jonah on 11/15/2015.
 */
var express = require('express');
var router = express.Router();
var swopprCtrl = require('../controllers/swoppr.product.controller');

router.get('/getById/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getProductById(req, res, id);
});

router.post('/newProduct', function(req, res) {
    return swopprCtrl.addProductUser(req, res);
});

module.exports = router;