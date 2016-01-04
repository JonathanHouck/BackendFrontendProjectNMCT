/**
 * Created by jonah on 1/4/2016.
 */

(function() {
    "use strict";
    var mongoose = require("mongoose");
    var ProductSchema = require("../schemas/product");

    module.exports = mongoose.model('Product', ProductSchema);
})();