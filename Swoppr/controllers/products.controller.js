/**
 * Created by jonah on 11/15/2015.
 */
var products = require('../models/products.model.js');

exports.create = function(req, res) {
    var entry = new products({
        productName: req.body.productName,
        pricePerDay: req.body.pricePerDay,
        description: req.body.description
    });

    entry.save();

    // Redirect to the home page...
    res.redirect(301, '/');
};