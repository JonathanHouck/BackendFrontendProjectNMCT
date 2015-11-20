/**
 * Created by jonah on 11/15/2015.
 */
var swoppr = require('../models/swoppr.model.js');
var async = require('async');

//veralgemenen naar getAllRentings
// --> indien renterFrom --> _renterFrom finden
// --> indien renterTo --> _renterTo finden

exports.getAllRentingsRenterFrom = function (req, res, id) {
    swoppr.rentingModel.find({_renterFrom: id})
        .lean()
        .exec(function(err, rentings) {

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
                        .exec(cbProductWithRenterFrom);

                    function cbProductWithRenterFrom(err, renterFrom) {

                        if(err) callback2("renterFrom bestaat niet", "getRenterFromWithProduct");

                        product = renterFrom.products.id(renting._product);

                        if (!product) {
                            if(err) callback2("product bestaat niet", "getRenterFromWithProduct");
                        }

                        renterFrom = renterFrom.toObject();
                        delete renterFrom.products;

                        renterFrom.product = product;
                        renting.renterFrom = renterFrom;

                        callback2(null, "getRenterFromWithProduct");
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
            swoppr.userModel.findById(req.body.renterFrom)
                .exec(function(err, renterFrom) {
                    if(err) callback("renterFrom bestaat niet", "checkRenterWithProduct");

                    product = renterFrom.products.id(req.body.productId);

                    if (!product) {
                        if(err) callback("product bestaat niet", "checkRenterWithProduct");
                    }

                    callback(null, "checkRenterWithProduct");
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
            _renterFrom: req.body.renterFrom,
            _renterTo: req.body.renterTo,
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
