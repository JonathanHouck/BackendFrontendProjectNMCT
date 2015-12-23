/**
 * Created by jonah on 11/15/2015.
 */
var swoppr = require('../schemas/swoppr.schema.js');
var async = require('async');

module.exports.createUser = function(req, res) {
    "use strict";

    var entry = new swoppr.userModel({
        firstname: req.body.firstname,
        surname: req.body.surname,
        emailadres: req.body.emailadres
    });

    entry.save(function(err2) {
        if (err2) {
            res.json({"error": "Toevoegen gebruiker mislukt"});
            return;
        }

        res.json({"ok": "Gebruiker toegevoegd"});
    });
};

module.exports.getUserById = function(req, res, id) {
    "use strict";

    swoppr.userModel
        .findById(id)
        .lean()
        .exec(function(err, user) {
            if (err || !user) {
                res.json({"error": "UserId niet gevonden"});
                return ;
            }

            res.json(user);
    });
};

module.exports.getAllUsersWithProducts = function(req, res) {
    "use strict";

    swoppr.userModel
        .find()
        .exec(function(err, users) {

        if(err || !users) {
            res.json({"error": "Geen users gevonden"});
            return ;
        }

        var usersOutput = [];

        async.each(users, iteratorUsers, function(err) {
            //na ophalen van alle users
            if (err) {
                res.json({"error": "Ophalen users mislukt"});
            }

            res.json(usersOutput);
        });

        function iteratorUsers(user, callback) {

            if (user.products.length > 0) {
                usersOutput.push(user);
            }

            callback(null, "getUsers");

        }
    });
};

module.exports.getAll = function(req, res) {
    "use strict";

    swoppr.userModel
        .find()
        .exec(function(err, users) {
            if(err || !users) {
                res.json({"error": "Geen users gevonden"});
                return ;
            }
            console.log("hell");
            res.json(users);
    });
};