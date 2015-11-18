/**
 * Created by jonah on 11/15/2015.
 */
var express = require('express');
var router = express.Router();
var swopprCtrl = require('../controllers/swoppr.renting.controller');

/*router.get('/getById/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getProductById(req, res, id);
});*/

router.post('/newRenting', function(req, res) {
    return swopprCtrl.addRentingUser(req, res);
});

router.get('/getAllRentingsRenterFrom/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getAllRentingsRenterFrom(req,res, id);
});

module.exports = router;