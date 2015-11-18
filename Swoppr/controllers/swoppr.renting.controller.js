/**
 * Created by jonah on 11/15/2015.
 */
var swoppr = require('../models/swoppr.model.js');
var async = require('async');

exports.getAllRentingsRenterFrom = function (req, res, id) {
    swoppr.rentingModel.find({_renterFrom: id})
        .lean()
        .exec(function(err, rentings) {
        //console.log(rentings);

        if(err) {
            res.json({"error": "Geen rentings gevonden voor het id"});
            return ;
        }

        var rentingsOutput = [];

        /////////////////////////
        //ALLE RENTINGS OVERLOPEN
        /////////////////////////

        async.each(rentings, iteratorRentings, function(err) {
            if (err) {
                res.json({"error": "Ophalen rentings mislukt"});
            }

            res.json(rentingsOutput);
        });

        function iteratorRentings(renting, callback) {
            //voor elke renting: renterFrom, product en renterTo zoeken

            async.series([

                /////////////////////////////////
                //RENTERFROM EN PRODUCT OPHALEN//
                /////////////////////////////////

                function(callback2) {
                    swoppr.userModel.findById(renting._renterFrom)
                        .lean()
                        .exec(cbRenterFromEnProduct);

                    function cbRenterFromEnProduct(err, user) {
                        if(err) callback2("renterFrom bestaat niet", "getRenterFrom");

                        ///////////////////
                        //PRODUCT OPHALEN//
                        ///////////////////

                        async.each(user.products, function(product, callback3) {

                            if (product._id.equals(renting._product)) {
                                user.product = product;
                            }
                            callback3();

                        }, function(err) {
                            if (err) { callback2("probleem bij loopen doorheen producten", "getProductFrom")}

                            if (user.product) {

                                delete user.products;
                                renting.renterFrom = user;

                                callback2(null, "getProductFrom");

                            } else {
                                callback2("productId bestaat niet", "getProductFrom")
                            }
                        });
                    }
                },

                /////////////////////
                //RENTERTO OPHALEN//
                ////////////////////

                function(callback2) {

                    swoppr.userModel.findById(renting._renterTo)
                        .lean()
                        .exec(cbRenterTo);

                    function cbRenterTo(err, user) {
                        if(err) callback2("renterTo bestaat niet", "getRenterFrom");

                        if (user.products) {
                            delete user.products;
                        }

                        renting.renterTo = user;
                        callback2(null, "getRenterTo");
                    }
                }

            //////////////////////////////////////////////////////////
            //INFO RENTING OPGEHAALD, RENTING TOEVOEGEN AAN RENTINGS//
            //////////////////////////////////////////////////////////

            ], function(err, results) {
                if (err) {
                    res.json({"error": "Ophalen renting met rentingFrom, product en rentingTo mislukt"});
                }

                rentingsOutput.push(renting);
                callback();
            });
        }
    });
};

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

                    //console.log(products);

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
};
