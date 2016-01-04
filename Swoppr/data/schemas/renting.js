/**
 * Created by jonah on 1/4/2016.
 */

(function() {
    "use strict";

    var mongoose = require( 'mongoose');

    module.exports = new mongoose.Schema({
        _renterFrom: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        _renterTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        _product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
        fromDate: { type: Date},
        toDate: { type: Date},
        daysToRent: Number,
        totalPrice: Number,
        createdOn: { type: Date, default: Date.now() + 60 * 60000 }
    });
})();