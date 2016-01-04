/**
 * Created by jonah on 1/4/2016.
 */

(function() {
    "use strict";

    var mongoose = require( 'mongoose');

    module.exports = new mongoose.Schema({
        _renting: {type: mongoose.Schema.Types.ObjectId, ref: 'Renting'},
        _sender: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: String,
        content: String,
        createdOn: { type: Date}
    });
})();