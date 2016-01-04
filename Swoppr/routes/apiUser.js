/**
 * Created by jonah on 11/15/2015.
 */
var express = require('express');
var router = express.Router();
var UsersRepo = require('../data/models/usersRepo');

router.get('/getById/:id', function(req, res) {
    var id = req.params.id;
    return UsersRepo.getUserById(req, res, id);
});

router.get('/getAll', function(req, res) {
    return UsersRepo.getAll(req, res);
});

router.get('/getAllUsersWithProducts', function(req, res) {
    return UsersRepo.getAllUsersWithProducts(req, res);
});

/*router.post('/newUser', function(req, res) {
    return UsersRepo.createUser(req, res);
});*/

router.get('/userDataNavbar/:datetime', function(req, res) {
    if(req.isAuthenticated()) {
        return res.json(req.user);
    } else {
        return res.json("error");
    }
});

module.exports = router;