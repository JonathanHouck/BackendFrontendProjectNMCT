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

/*var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'swoppr',
    api_key: '574615225534372',
    api_secret: 'mNUyKP0jlRPHTgGs_yUeiTod5dw'
});*/

router.post('/', multipartyMiddleware, function(req, res) {

    return swopprCtrl.addProductWithPictureUser(req, res);

    /*var file = req.files.file;
    var productName = req.body.productName;

    if (file) {
        cloudinary.uploader.upload(file.path, function(result) {
            if (result.url) {
                console.log("url: " + result.url + " public id" + result.public_id);
            } else {
                res.json(error);
            }
        });
    }*/
});

module.exports = router;