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

            async.each(rentings, function(renting, callback) {
                //voor elke renting: renterFrom, product en renterTo zoeken

                async.series([

                    /////////////////////////////////
                    //RENTERFROM EN PRODUCT OPHALEN//
                    /////////////////////////////////

                    function(callback2) {
                        swoppr.userModel.findById(renting._renterFrom)
                            .lean()
                            .exec(function(err, user) {
                                if(err) callback2("userId bestaat niet", "getRenterFrom");

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
                            });
                    },

                    //////////////////////
                    //RENTER TO OPHALEN//
                    /////////////////////

                    function(callback2) {
                        renting.renterTo = "Hello";
                        callback2(null, "getRenterTo");
                    }

                    //////////////////////////////////////////////////////////
                    //INFO RENTING OPGEHAALD, RENTING TOEVOEGEN AAN RENTINGS//
                    //////////////////////////////////////////////////////////

                ], function(err, results) {
                    if (!err) {
                        rentingsOutput.push(renting);
                        callback();
                    }
                });
                ///////////////////////////
                //ALLE RENTINGS OPGEHAALD//
                ///////////////////////////

            }, function(err) {
                if (err) {
                    res.json({"error": "Ophalen renting met rentingFrom en rentingTo mislukt"});
                }

                res.json(rentingsOutput);
            });
        });
};