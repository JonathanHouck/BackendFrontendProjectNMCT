/**
 * Created by jonah on 12/2/2015.
 */
var express = require('express');
var router = express.Router();
var MessagesRepo = require('../data/models/messagesRepo');

router.get('/:rentingid', function(req, res) {
    var rentingid = req.params.rentingid;
    return MessagesRepo.getMessagesByRentingId(req, res, rentingid);
});

router.post('/:rentingId', function(req, res){
    var rentingid = req.params.rentingId;
    return MessagesRepo.addMessage(req, res, rentingid);
});

module.exports = router;