/**
 * Created by jonah on 11/15/2015.
 */
var express = require('express');
var router = express.Router();
var swopprCtrl = require('../controllers/swoppr.user.controller');

router.get('/getById/:id', function(req, res) {
    var id = req.params.id;
    return swopprCtrl.getUserById(req, res, id);
});

router.post('/newUser', function(req, res) {
    return swopprCtrl.createUser(req, res);
});

module.exports = router;