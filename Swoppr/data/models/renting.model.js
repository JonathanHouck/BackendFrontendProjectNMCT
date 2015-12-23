/**
 * Created by jonah on 11/15/2015.
 */
var swoppr = require('../schemas/swoppr.schema.js');
var async = require('async');

//veralgemenen naar getAllRentings
// --> indien renterFrom --> _renterFrom finden
// --> indien renterTo --> _renterTo finden

module.exports.getRentingById = function (req, res, id) {
    "use strict";

    swoppr.rentingModel
        .findById(id)
        .lean()
        .exec(function(err, renting) {
            if (err || !renting) {
                res.json({"error": "RentingId niet gevonden"});
                return ;
            }

            async.series([

                //renterFrom en product ophalen
                function(callback) {
                    getRenterFromAndProduct(renting, callback);
                },

                //renterTo ophalen
                function(callback) {

                    getRenterTo(renting, callback);
                }

                //info renting opgehaald, renting toevoegen aan rentings
            ], function(err, results) {

                if (err) {
                    res.json({"error": "Ophalen renting met rentingFrom, product en rentingTo mislukt"});
                }

                res.json(renting);
            });
        });
};

module.exports.getAllRentings = function (req, res, id, byWichId) {
    "use strict";

    var byWichIdObj;

    switch(byWichId) {
        case 1:
            byWichIdObj = {_renterFrom: id};
            break;
        case 2:
            byWichIdObj = {_renterTo: id};
            break;
        case 3:
            byWichIdObj = {_product: id};
            break;
        default:
            byWichIdObj = {_renterFrom: id};
    }

    swoppr.rentingModel.find(byWichIdObj)
        .lean()
        .exec(function(err, rentings) {

            if(err) {
                res.json({"error": "Geen rentings gevonden voor het id"});
                return ;
            }

            var rentingsOutput = [];

            //alle rentings overlopen
            async.each(rentings, iteratorRentings, function(err) {
                if (err || !rentings) {
                    res.json({"error": "Ophalen rentings mislukt"});
                    return;
                }

                res.json(rentingsOutput);
            });

            function iteratorRentings(renting, callback) {
                //voor elke renting: renterFrom, product en renterTo zoeken

                async.series([

                    //renterFrom en product ophalen
                    function(callback2) {
                        getRenterFromAndProduct(renting, callback2);
                    },

                    //renterTo ophalen
                    function(callback2) {
                        getRenterTo(renting, callback2);
                    }

                    //info renting opgehaald, renting toevoegen aan rentings
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

function getRenterFromAndProduct(renting, callback) {
    "use strict";

    swoppr.userModel.findById(renting._renterFrom)
        .exec(cbProductWithRenterFrom);

    function cbProductWithRenterFrom(err, renterFrom) {

        if(err || !renterFrom) {
            callback("renterFrom bestaat niet", "getRenterFromWithProduct");
            return;
        }

        var product = renterFrom.products.id(renting._product);

        if (!product) {
            if(err) callback("product bestaat niet", "getRenterFromWithProduct");
        }

        renterFrom = renterFrom.toObject();
        delete renterFrom.products;

        renterFrom.product = product;
        renting.renterFrom = renterFrom;

        callback(null, "getRenterFromWithProduct");
    }
}

function getRenterTo(renting, callback) {
    "use strict";

    swoppr.userModel.findById(renting._renterTo)
        .lean()
        .exec(cbRenterTo);

    function cbRenterTo(err, user) {

        if(err || !user) {
            callback("renterTo bestaat niet", "getRenterFrom");
            return;
        }

        if (user.products) {
            delete user.products;
        }

        renting.renterTo = user;
        callback(null, "getRenterTo");
    }
}

module.exports.addRentingUser = function(req, res) {
    "use strict";

    //controle product van de renter bestaat
    async.series([
        function(callback) {
            swoppr.userModel.findById(req.body.renterFrom)
                .exec(function(err, renterFrom) {
                    if(err || !renterFrom) {
                        callback("renterFrom bestaat niet", "checkRenterWithProduct");
                        return;
                    }

                    var product = renterFrom.products.id(req.body.productId);

                    if (!product) {
                        callback("product bestaat niet", "checkRenterWithProduct");
                        return;
                    }

                    callback(null, "checkRenterWithProduct");
            });
        },
        function(callback) {
            swoppr.userModel.findById(req.body.renterTo, function(err, user) {
                if (err || !user) {
                    callback("renterId bestaat niet", "checkRenter");
                } else {
                    callback(null, "checkRenter");
                }
            });
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
            fromDate: req.body.fromDate,
            toDate: req.body.toDate,
            daysToRent: req.body.daysToRent,
            totalPrice: req.body.totalPrice
        });

        entry.save(function(err) {
            if (err) {
                res.json({"error": "Renting toevoegen mislukt"});
            }

            res.json({"ok": "Renting toegevoegd"});
        });
    });
};
