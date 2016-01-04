/**
 * Created by jonah on 1/4/2016.
 */

(function() {
    "use strict";

    var mongoose = require( 'mongoose');

    module.exports = new mongoose.Schema({
        productName: String,
        pricePerDay: String,
        description: String,
        url: String,
        publicid: String,
        place: String,
        longitude: String,
        latitude: String,
        isDeleted: {type: Boolean, default: false},
        createdOn: { type: Date, default: Date.now() + 60 * 60000 }
    });
})();