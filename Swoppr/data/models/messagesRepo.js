/**
 * Created by jonah on 11/15/2015.
 */

MessagesRepo = (function() {
    "use strict";

    var Message = require('./message');
    var Renting = require('./renting');

    var getMessagesByRentingId = function(req, res, rentingid) {
        Message.find({"_renting": rentingid})
            .exec(function(err, messages) {
                if (err || !messages) {
                    res.json({"error": "rentingid not found"});
                    return ;
                }

                res.json({"ok": messages});
            });
    };

    var addMessage = function(req, res, rentingid) {
        Renting
            .findById(rentingid)
            .exec(function(err, renting) {
                if (err || !renting) {
                    res.json({"error": "RentingId not found"});
                    return ;
                }

                var entry = new Message({
                    _renting: rentingid,
                    _sender: req.body.senderId,
                    name: req.body.name,
                    content: req.body.content,
                    createdOn: req.body.createdOn
                });

                entry.save(function(err) {
                    if (err) {
                        res.json({"error": "Toevoegen message mislukt"});
                        return;
                    }

                    res.json({"ok": entry});
                });
            });
    };

    return {
        model: Message,
        getMessagesByRentingId: getMessagesByRentingId,
        addMessage: addMessage
    };
})();

module.exports = MessagesRepo;