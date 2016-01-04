/**
 * Created by jonah on 1/4/2016.
 */

(function() {
    "use strict";

    var mongoose = require( 'mongoose');
    var min = [1, 'the value should be greather than {MIN}'];

    module.exports = new mongoose.Schema({
        _renterFrom: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: 'renterFrom is required'},
        _renterTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: 'renterTo is required'},
        _product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: 'product is required'},
        fromDate: { type: Date, required: 'fromData is required'},
        toDate: { type: Date, required: 'toDate is required'},
        daysToRent: {type: Number, required: 'daysToRent is required', min: min},
        totalPrice: {type: Number, required: 'totalPrice is required', min: min},
        createdOn: { type: Date, default: Date.now() + 60 * 60000 }
    });
})();