/**
 * Created by jonah on 1/4/2016.
 */

(function() {
    "use strict";

    var mongoose = require( 'mongoose');

    function minlength(length) {
        return [length, 'The value is shorter than the minimum allowed length {MINLENGTH}'];
    }

    function maxLength(length) {
        return [length, 'The value exceeeds the allowed length {MAXLENGTH}'];
    }

    var min = [1, 'the value is beneath the limit {MIN}'];
    var max = [10000, 'the value exceeds the limit {MAX}'];

    module.exports = new mongoose.Schema({
        productName: {type: String, required: 'productName is required', maxlength: maxLength(50)},
        pricePerDay: {type: Number, required: 'pricePerDay is required', min: min, max: max},
        description: {type: String, required: 'productName is required', minlength: minlength(20), maxlength: maxLength(50)},
        url: String,
        publicid: String,
        place: {type: String, required: 'place is required'},
        longitude: {type: String, required: 'longitude is required'},
        latitude: {type: String, required: 'latitude is required'},
        isDeleted: {type: Boolean, default: false},
        createdOn: { type: Date, default: Date.now() + 60 * 60000 }
    });
})();