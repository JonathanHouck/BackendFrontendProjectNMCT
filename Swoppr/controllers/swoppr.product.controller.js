/**
 * Created by jonah on 11/15/2015.
 */
//var mongoose = require( 'mongoose' );
var swoppr = require('../models/swoppr.model.js');
var async = require('async');

exports.getProductById = function(req, res, id) {
    swoppr.userModel.findOne({"products._id": id})
        .exec(function(err, userWithProducts) {
            if (err) {
                res.json({"error": "productId not found"});
                return ;
            }

            var product = userWithProducts.products.id(id);
            res.json(product);
    });
};

exports.getProductByIdUser = function(req, res, id) {
    swoppr.userModel
        .findOne({"products._id": id})
        .exec(function(err, userWithProducts) {
            if (err) {
                res.json({"error": "productId not found"});
                return ;
            }

            var product = userWithProducts.products.id(id);

            userWithProducts = userWithProducts.toObject();
            delete userWithProducts.products;
            userWithProducts.product = product;

            res.json(userWithProducts);
        });
};

exports.addProductUser = function(req, res) {
    swoppr.userModel.findOne({_id: req.body.userId}, function(err, user) {
        if (err) {
            res.json({"error": "userId not found"});
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

exports.getAllProducts = function(req, res) {

    swoppr.userModel.find().exec(function(err, users) {

        if(err) {
            res.json({"error": "Geen users gevonden"});
            return ;
        }

        var products = [];

        async.each(users, iteratorUsers, function(err) {
            //na ophalen van alle users
            if (err) {
                res.json({"error": "Ophalen users mislukt"});
            }

            res.json(products);
        });

        function iteratorUsers(user, callback) {

            async.each(user.products, iteratorProducts, function(err) {

                //na ophalen alle producten van de user
                if (err) {
                    callback("Fout bij bij overlopen user", "getUsers")
                }

                callback(null, "getUsers")
            });

            function iteratorProducts(product, callback2) {
                if (err) {
                    callback2("Fout bij overlopen producten users", "getProductsOfUser")
                }

                products.push(product);
                callback2(null, "getProductsUser");
            }
        }
    })
};

exports.editProductUser = function(req, res) {

};
