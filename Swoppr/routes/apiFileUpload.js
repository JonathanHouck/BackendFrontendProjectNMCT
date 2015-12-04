/**
 * Created by jonah on 12/4/2015.
 */

/**
 * Created by jonah on 11/15/2015.
 */
var express = require('express');
var router = express.Router();
var swopprCtrl = require('../data/models/product.model');
var multiparty = require('connect-multiparty'), multipartyMiddleware = multiparty();

router.post('/', multipartyMiddleware, function(req, res) {
    return swopprCtrl.addProductWithPictureUser(req, res);
});

module.exports = router;