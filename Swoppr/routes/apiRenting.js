/**
 * Created by jonah on 11/15/2015.
 */
var express = require('express');
var router = express.Router();
var RentingsRepo = require('../data/models/rentingsRepo');

router.post('/newRenting', function(req, res) {
    return RentingsRepo.addRentingUser(req, res);
});

router.get('/getById/:id', function(req, res) {
    var id = req.params.id;
    return RentingsRepo.getRentingById(req, res, id);
});

router.post('/editRenting', function(req, res) {
    return RentingsRepo.editRenting(req, res);
});

router.get('/removeById/:id', function(req, res) {
    var id = req.params.id;
    return RentingsRepo.removeRentingById(req, res, id);
});

router.get('/getAllRentingsRenterFrom/:id', function(req, res) {
    var id = req.params.id;
    return RentingsRepo.getAllRentings(req, res, id, 1);
});

router.get('/getAllRentingsRenterTo/:id', function(req, res) {
    var id = req.params.id;
    return RentingsRepo.getAllRentings(req, res, id, 2);
});

router.get('/getAllRentingsProduct/:id', function(req, res) {
    var id = req.params.id;
    return RentingsRepo.getAllRentings(req, res, id, 3);
});

module.exports = router;