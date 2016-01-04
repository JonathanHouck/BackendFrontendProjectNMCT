/**
 * Created by jonah on 1/4/2016.
 */

(function() {
    "use strict";
    var mongoose = require("mongoose");
    var UserSchema = require("../schemas/user");

    module.exports = mongoose.model('User', UserSchema, 'Users');
})();