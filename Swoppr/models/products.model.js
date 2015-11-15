/**
 * Created by jonah on 11/15/2015.
 */
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var productsSchema = new Schema({
    productName: String,
    pricePerDay: String,
    description: String,
    createdOn: { type: Date, default: Date.now }
});

module.exports = mongoose.model( 'products', productsSchema );