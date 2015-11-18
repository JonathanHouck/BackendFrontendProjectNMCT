/**
 * Created by jonah on 11/18/2015.
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