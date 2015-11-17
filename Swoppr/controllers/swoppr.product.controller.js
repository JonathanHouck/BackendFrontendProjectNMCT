/**
 * Created by jonah on 11/15/2015.
 */
var swoppr = require('../models/swoppr.model.js');

exports.getProductById = function(req, res, id) {
    swoppr.productModel.findById(id, function(err, product) {
        if (err) {
            res.json({"error": "id not found"});
            return ;
        }

        var productJson = {"_id": product.id,
            "userId": product.userId,
            "productName": product.productName,
            "pricePerDay": product.pricePerDay,
            "description": product.description};

        res.json(productJson);
    });
};

exports.addProductUser = function(req, res) {
    swoppr.userModel.findOne({_id: req.body.userId}, function(err, user) {
        if (err) {
            res.json({"error": "id not found"});
            return ;
        }

        var entry = new swoppr.productModel( {
            productName: req.body.productName,
            pricePerDay: req.body.pricePerDay,
            description: req.body.description
        });

        user.products.push(entry);

        user.save(function(err2) {
            if (err2) {
                res.json({"error": "adding product to user failed"});
            }
        });

        res.json({"ok": "product added"})
    })
};

/*exports.addProduct = function(req, res) {
    swoppr.userModel.findById(req.body.userId, function(err, user) {
        if (err) {
            res.json({"error": "id not found"});
            return ;
        }

        var entry = new swoppr.productModel( {
            userId: user._id,
            productName: req.body.productName,
            pricePerDay: req.body.pricePerDay,
            description: req.body.description
        });

        entry.save(function(err2) {
            if (err2) {
                res.json({"error": "adding product failed"});
            }
        });

        res.json({"ok": "product added"})
    })
};*/
