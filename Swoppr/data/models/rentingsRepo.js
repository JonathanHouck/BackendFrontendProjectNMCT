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
                    res.json({"error": "RentingId not found"});
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
                        res.json({"error": "Retrieving renting with renterFrom, product en rentingTo failed"});
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
                    res.json({"error": "No renting found for the id"});
                    return ;
                }

                var rentingsOutput = [];

                //alle rentings overlopen
                async.each(rentings, iteratorRentings, function(err) {
                    if (err || !rentings) {
                        res.json({"error": "Retrieving rentings failed"});
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
                            res.json({"error": "Retrieving renting with renterFrom, product en rentingTo failed"});
                        }

                        rentingsOutput.push(renting);
                        callback();
                    });
                }
            });
    };

    function getRenterFromAndProduct(renting, callback) {
        User.findById(renting._renterFrom)
            .exec(cbProductWithRenterFrom);

        function cbProductWithRenterFrom(err, renterFrom) {

            if(err || !renterFrom) {
                callback("renterFrom doesn't exist", "getRenterFromWithProduct");
                return;
            }

            var product = renterFrom.products.id(renting._product);

            if (!product) {
                if(err) callback("product doesn't exist", "getRenterFromWithProduct");
            }

            renterFrom = renterFrom.toObject();
            delete renterFrom.products;

            renterFrom.product = product;
            renting.renterFrom = renterFrom;

            callback(null, "getRenterFromWithProduct");
        }
    }

    function getRenterTo(renting, callback) {
        User.findById(renting._renterTo)
            .lean()
            .exec(cbRenterTo);

        function cbRenterTo(err, user) {

            if(err || !user) {
                callback("renterTo doesn't exist", "getRenterFrom");
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

        var renterFromDb;

        async.series([
            function(callback) {
                User.findById(req.body.renterFrom)
                    .exec(function(err, renterFrom) {
                        if(err || !renterFrom) {
                            callback("renterFrom doesn't exist", "checkRenterWithProduct");
                            return;
                        }
                        renterFromDb = renterFrom;
                        var product = renterFrom.products.id(req.body.productId);

                        if (!product) {
                            callback("product doesn't exist", "checkRenterWithProduct");
                            return;
                        }

                        callback(null, "checkRenterWithProduct");
                    });
            },
            function(callback) {
                User.findById(req.body.renterTo, function(err, user) {
                    if (err || !user) {
                        callback("renterId doesn't exist", "checkRenter");
                    } else {
                        callback(null, "checkRenter");
                    }
                });
            }

        ], function(err, results) {
            if (err) {
                res.json({"error": "entered ID's do not exist"});
                return ;
            }

            var valid = checkDatesAndTotalPrice(renterFromDb, req, res);

            if (valid) {
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
                        res.json({"error": "Adding renting failed"});
                    }

                    res.json({"ok": entry});
                });
            }
        });
    };

    var removeRentingById = function(req, res, id) {
        Renting
            .findById(id).remove().exec(function(err, result) {
            if (err) {
                res.json({"error": "rentingId not found"});
                return ;
            }

            Message
                .find({"_renting": id}).remove().exec(function(err, result) {
                if (err) {
                    res.json({"error": "error when deleting messages"});
                    return;
                }

                res.json({"ok": id});
            });
        });
    };

    var editRenting = function(req, res) {
        var rentingDb;

        Renting.findById(req.body.id).exec(function(err, renting) {
            if (err || !renting) {
                res.json({"error": "renting not found"});
                return ;
            }

            rentingDb = renting;

            if (req.body.fromDate && req.body.toDate && req.body.daysToRent && req.body.totalPrice) {
                User.findById(renting._renterFrom)
                    .exec(cbEditRenting);
            }
        });

        function cbEditRenting (err, renterFrom) {
            if(err || !renterFrom) {
                res.json({"error": "renterFrom not found"});
                return;
            }

            var valid = checkDatesAndTotalPrice(renterFrom, req, res);

            if (valid) {
                rentingDb.fromDate = req.body.fromDate;
                rentingDb.toDate = req.body.toDate;
                rentingDb.daysToRent = req.body.daysToRent;
                rentingDb.totalPrice = req.body.totalPrice;

                rentingDb.save(function(err) {
                    if (err) {
                        res.json({"error": "Eerror while saving renting"});
                    } else {
                        res.json({"ok": rentingDb});
                    }
                });
            }
        }
    };

    function checkDatesAndTotalPrice(renterFrom, req, res) {
        if (req.body.fromDate >= req.body.toDate) {
            res.json({"error": "fromDate must be earlier than the toDate"});
            return false ;
        } else {
            var correctDaysToRent = new Date(req.body.toDate).getDate() - new Date(req.body.fromDate).getDate();
            if (correctDaysToRent != req.body.daysToRent) {
                res.json({"error": "daysToRent not correct"});
                return false;
            }


            var totalPriceCorrect = renterFrom.products.id(req.body.productId).pricePerDay * req.body.daysToRent;
            if (totalPriceCorrect != req.body.totalPrice) {
                res.json({"error": "totalPrice not correct"});
                return false;
            }

            return true;
        }
    }

    return {
        model: Renting,
        getRentingById: getRentingById,
        getAllRentings: getAllRentings,
        addRentingUser: addRentingUser,
        removeRentingById: removeRentingById,
        editRenting: editRenting
    };
})();

module.exports = RentingsRepo;