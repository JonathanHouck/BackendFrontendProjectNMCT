/**
 * Created by jonah on 1/4/2016.
 */

(function() {
    "use strict";

    var mongoose = require( 'mongoose');

    var maxlength = [120, 'The value exceeeds the allowed length {MAXLENGTH}'];

    module.exports = new mongoose.Schema({
        _renting: {type: mongoose.Schema.Types.ObjectId, ref: 'Renting', required: 'renting is required'},
        _sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: 'sender is required'},
        name: {type: String, required: 'name is required'},
        content: {type: String, required: 'content is required', maxlength: maxlength},
        createdOn: {type: Date, required: 'createdOn is required'}
    });
})();