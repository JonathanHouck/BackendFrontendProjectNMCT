/**
 * Created by jonah on 1/4/2016.
 */

(function() {
    "use strict";
    var mongoose = require("mongoose");
    var RentingSchema = require("../schemas/renting");

    module.exports = mongoose.model('Renting', RentingSchema, 'Rentings');
})();