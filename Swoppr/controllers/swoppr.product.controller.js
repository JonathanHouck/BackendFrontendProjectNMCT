/**
 * Created by jonah on 11/15/2015.
 */
//var mongoose = require( 'mongoose' );
var swoppr = require('../models/swoppr.model.js');
var async = require('async');

exports.getProductByName = function(req, res, name) {
    swoppr.userModel.findOne({"products._id": id})
        .exec(function(err, userWithProducts) {
            if (err) {
                res.json({"error": "productId niet gevonden"});
                return ;
            }

            var product = userWithProducts.products.id(id);
            res.json(product);
    });
};


exports.getProductById = function(req, res, id) {
    swoppr.userModel.findOne({"products._id": id})
        .exec(function(err, userWithProducts) {
            if (err) {
                res.json({"error": "productId niet gevonden"});
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
                res.json({"error": "productId niet gevonden"});
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
            res.json({"error": "userId niet gevonden"});
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
                res.json({"error": "Product toevoegen aan gebruiker mislukt"});
            }
        });

        res.json({"ok": "Product toegevoegd"})
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
    swoppr.userModel.findOne({"products._id": req.body.id}).exec(function(err, userWithProduct) {

        if (err || userWithProduct == null) {
            res.json({"error": "productId niet gevonden"});
            return ;
        }

        if (req.body.pricePerDay) userWithProduct.products.id(req.body.id).pricePerDay = req.body.pricePerDay;
        if (req.body.productName) userWithProduct.products.id(req.body.id).productName = req.body.productName;

        userWithProduct.save(function(err) {
            if (err) {
                res.json({"error": "Fout bij opslaan product van de gebruiker"});
            }

            res.json({"ok": "Product gewijzigd"})
        });
    });
};

exports.removeProductUser = function(req, res, id) {
    console.log("hello");

    swoppr.userModel.findOne({"products._id": id}).exec(function(err, userWithProduct) {
        if (err || userWithProduct == null) {
            res.json({"error": "productId niet gevonden"});
            return ;
        }

        userWithProduct.products.id(id).remove();

        userWithProduct.save(function(err) {
            if (err) {
                res.json({"error": "Fout bij verwijderen product van de gebruiker"});
            }

            res.json({"ok": "Product verwijderd"})
        });

    });
};