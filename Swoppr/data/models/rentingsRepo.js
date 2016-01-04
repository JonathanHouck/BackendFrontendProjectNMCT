/**
 * Created by jonah on 11/15/2015.
 */

RentingsRepo = (function() {
    "use strict";

    var async = require('async');
    var Renting = require('./renting');
    var Message = require('./message');
    var User = require('./user');

    var getRentingById = function (req, res, id) {
        Renting
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

                    res.json({"ok": renting});
                });
            });
    };

    var getAllRentings = function (req, res, id, byWichId) {
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

        Renting.find(byWichIdObj)
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

                    res.json({"ok": rentingsOutput});
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

        User.findById(renting._renterFrom)
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

        User.findById(renting._renterTo)
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

    var addRentingUser = function(req, res) {
        //controle of product van de renter bestaat
        async.series([
            function(callback) {
                User.findById(req.body.renterFrom)
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
                User.findById(req.body.renterTo, function(err, user) {
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

            var entry = new Renting( {
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

                res.json({"ok": entry});
            });
        });
    };

    var removeRentingById = function(req, res, id) {
        Renting
            .findById(id).remove().exec(function(err, result) {
            if (err) {
                res.json({"error": "rentingId niet gevonden"});
                return ;
            }

            Message
                .find({"_renting": id}).remove().exec(function(err, result) {
                if (err) {
                    res.json({"error": "fout bij verwijderen messages"});
                    return;
                }

                res.json({"ok": id});
            });
        });
    };

    var editRenting = function(req, res) {
        Renting.findById(req.body.id).exec(function(err, renting) {

            if (err || !renting) {
                res.json({"error": "productId niet gevonden"});
                return ;
            }

            if (req.body.fromDate) renting.fromDate = req.body.fromDate;
            if (req.body.toDate) renting.toDate = req.body.toDate;
            if (req.body.daysToRent) renting.daysToRent = req.body.daysToRent;
            if (req.body.totalPrice) renting.totalPrice = req.body.totalPrice;

            renting.save(function(err) {
                if (err) {
                    res.json({"error": "Fout bij opslaan vehuring"});
                } else {
                    res.json({"ok": renting});
                }
            });
        });
    };

    return {
        model: Renting,
        getRentingById: getRentingById,
        getAllRentings: getAllRentings,
        addRentingUser: addRentingUser,
        removeRentingById: removeRentingById,
        editRenting: editRenting
    }
})();

module.exports = RentingsRepo;