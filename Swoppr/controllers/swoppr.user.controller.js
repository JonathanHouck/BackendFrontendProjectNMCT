/**
 * Created by jonah on 11/15/2015.
 */
var swoppr = require('../models/swoppr.model.js');
var async = require('async');

exports.createUser = function(req, res) {
    var entry = new swoppr.userModel({
        lastname: req.body.lastname,
        surname: req.body.surname,
        emailadres: req.body.emailadres
    });

    entry.save(function(err2) {
        if (err2) {
            res.json({"error": "adding user failed"});
        }

        res.json({"ok": "user added"})
    });
};

exports.getUserById = function(req, res, id) {
    swoppr.userModel
        .findById(id)
        .lean()
        .exec(function(err, user) {
            if (err) {
                res.json({"error": "id not found"});
                return ;
            }

            res.json(user);
    });
};

exports.getAllUsersWithProducts = function(req, res) {
    swoppr.userModel
        .find()
        .exec(function(err, users) {

        if(err) {
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
    })
};

exports.getAll = function(req, res) {
    swoppr.userModel
        .find()
        .exec(function(err, users) {
            if(err) {
                res.json({"error": "Geen users gevonden"});
                return ;
            }
            console.log("hell");
            res.json(users);
    })
};