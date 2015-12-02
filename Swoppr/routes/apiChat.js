/**
 * Created by jonah on 12/2/2015.
 */
var express = require('express');
var router = express.Router();
var swopprCtrl = require('../controllers/swoppr.message.controller');

router.get('/:rentingid', function(req, res) {
    var rentingid = req.params.rentingid;
    return swopprCtrl.getMessagesByRentingId(req, res, rentingid);
});

router.post('/:rentingid', function(req, res) {
    var rentingid = req.params.rentingid;
    return swopprCtrl.addMessageToRenting(req, res, rentingid);
});

module.exports = router;