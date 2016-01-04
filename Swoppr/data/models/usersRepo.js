/**
 * Created by jonah on 1/4/2016.
 */
UsersRepo = (function() {
    "use strict";

    var async = require('async');
    var User = require('./user');

    /*var createUser = function(req, res) {
        var entry = new User({
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
    };*/

    var getUserById = function(req, res, id) {
        User
            .findById(id)
            .lean()
            .exec(function(err, user) {
                if (err || !user) {
                    res.json({"error": "UserId niet gevonden"});
                    return ;
                }

                res.json({"ok": user});
            });
    };

    var getAllUsersWithProducts = function(req, res) {
        User
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

                    res.json({"ok": usersOutput});
                });

                function iteratorUsers(user, callback) {

                    if (user.products.length > 0) {
                        usersOutput.push(user);
                    }

                    callback(null, "getUsers");

                }
            });
    };

    var getAll = function(req, res) {
        User
            .find()
            .exec(function(err, users) {
                if(err || !users) {
                    res.json({"error": "Geen users gevonden"});
                    return ;
                }

                res.json({"ok": users});
            });
    };

    return {
        model: User,
        //createUser: createUser,
        getUserById: getUserById,
        getAllUsersWithProducts: getAllUsersWithProducts,
        getAll: getAll
    };
})();

module.exports = UsersRepo;