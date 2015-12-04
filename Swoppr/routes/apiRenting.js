/**
 * Created by jonah on 11/15/2015.
 */
var express = require('express');
var router = express.Router();
var swopprCtrl = require('../data/models/renting.model');

router.post('/newRenting', function(req, res) {
    return swopprCtrl.addRentingUser(req, res);
});

router.get('/getById/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getRentingById(req, res, id);
});

router.get('/getAllRentingsRenterFrom/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getAllRentings(req, res, id, 1);
});

router.get('/getAllRentingsRenterTo/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getAllRentings(req, res, id, 2);
});

router.get('/getAllRentingsProduct/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getAllRentings(req, res, id, 3);
});

module.exports = router;