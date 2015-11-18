/**
 * Created by jonah on 11/15/2015.
 */
var swoppr = require('../models/swoppr.model.js');
var async = require('async');

exports.addRentingUser = function(req, res) {

    var productExists = false;

    //controle product van de renter bestaat
    async.series([
        function(callback) {
            swoppr.userModel.findById(req.body.userId)
                //.select("products._id")
                .lean()
                .exec(function(err, products) {
                    if(err) callback("userId bestaat niet", "checkProduct");

                    console.log(products);

                    async.each(products.products, function(product, callback2) {
                        if (product._id == req.body.productId) {
                            productExists = true;
                        }
                        callback2();

                    }, function(err) {
                        if (err) { callback("probleem bij lopen doorheen producten", "checkProduct")}

                        if (productExists) {
                            callback(null, "checkProduct");
                        } else {
                            callback("product niet gevonden", "checkProduct")
                        }
                    });
            })
        },
        function(callback) {
            swoppr.userModel.findById(req.body.renterId, function(err, user) {
                if (err) callback("renterId bestaat niet", "checkRenter");
                else callback(null, "checkRenter");
            })
        }

    ], function(err, results) {
        if (err) {
            res.json({"error": "Ingevoerde id's bestaan niet"});
            console.log(err);
            return ;
        }

        var entry = new swoppr.rentingModel( {
            _renterFrom: req.body.userId,
            _renterTo: req.body.renterId,
            _product: req.body.productId,
            daysToRent: req.body.daysToRent
        });

        entry.save(function(err) {
            if (err) {
                res.json({"error": "Renting toevoegen mislukt"});
            }

            res.json({"ok": "Renting toegevoegd"})
        });
    });

    /*swoppr.userModel.findOne({_id: req.body.userId}, function(err, user) {
        if (err) {
            res.json({"error": "Person that has products to rent not found"});
            return ;
        }

        swoppr.userModel.findOne

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
    })*/
};
