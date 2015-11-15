/**
 * Created by jonah on 11/15/2015.
 */
var swoppr = require('../models/swoppr.model.js');

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
    });

    res.json({"ok": "user added"})
};