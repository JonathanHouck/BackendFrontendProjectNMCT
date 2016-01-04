/**
 * Created by jonah on 1/4/2016.
 */

(function() {
    "use strict";
    var mongoose = require("mongoose");
    var MessageSchema = require("../schemas/message");

    module.exports = mongoose.model('Message', MessageSchema, 'Messages');
})();