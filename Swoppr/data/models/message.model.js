/**
 * Created by jonah on 12/2/2015.
 */

var swoppr = require('../schemas/swoppr.schema.js');

module.exports.getMessagesByRentingId = function(req, res, rentingid) {
    "use strict";

    swoppr.messageModel.find({"_renting": rentingid})
        .exec(function(err, messages) {
            if (err || !messages) {
                res.json({"error": "rentingid niet gevonden"});
                return ;
            }

            res.json({"ok": messages});
        });
};

module.exports.addMessage = function(req, res, rentingid) {
    "use strict";
    swoppr.rentingModel
        .findById(rentingid)
        .exec(function(err, renting) {
            if (err || !renting) {
                res.json({"error": "RentingId niet gevonden"});
                return ;
            }

            var entry = new swoppr.messageModel({
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