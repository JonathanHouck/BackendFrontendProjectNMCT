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

            res.json(messages);
        });
};

module.exports.addMessageToRenting = function(req, res, rentingid) {
    "use strict";

    console.log(rentingid + req.body.name + req.body.content);

    var entry = new swoppr.messageModel({
        _renting: rentingid,
        name: req.body.name,
        content: req.body.content
    });

    entry.save(function(err) {
        if (err) {
            console.log(err);
            res.json({"error": "Toevoegen message mislukt"});
            return;
        }

        //res.json({"ok": "renting toegevoegd"})
        res.json(entry.toObject());
    });
};