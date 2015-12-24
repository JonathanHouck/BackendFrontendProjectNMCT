/**
 * Created by jonah on 12/2/2015.
 */
var express = require('express');
var router = express.Router();
var swopprCtrl = require('../data/models/message.model');

router.get('/:rentingid', function(req, res) {
    var rentingid = req.params.rentingid;
    return swopprCtrl.getMessagesByRentingId(req, res, rentingid);
});

router.post('/:rentingId', function(req, res){
    var rentingid = req.params.rentingId;
    return swopprCtrl.addMessage(req, res, rentingid);
});

module.exports = router;