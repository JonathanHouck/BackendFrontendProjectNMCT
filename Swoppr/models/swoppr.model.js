/**
 * Created by jonah on 11/15/2015.
 */
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var rentingSchema = new Schema({
    renterId: String,
    productId: String,
    fromDate: { type: Date},
    daysToRent: Number,
    Approved: Boolean
});

var userSchema = new Schema({
    lastname: String,
    surname: String,
    emailadres: String,
    rentings: [rentingSchema],
    createdOn: { type: Date, default: Date.now }
});

var productSchema = new Schema({
    userId: String,
    productName: String,
    pricePerDay: String,
    description: String,
    createdOn: { type: Date, default: Date.now }
});

module.exports.rentingModel = mongoose.model('rentings', rentingSchema);
module.exports.productModel = mongoose.model( 'products', productSchema );
module.exports.userModel = mongoose.model( 'users', userSchema );