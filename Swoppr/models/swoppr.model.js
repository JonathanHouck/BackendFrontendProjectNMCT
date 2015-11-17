/**
 * Created by jonah on 11/15/2015.
 */
var mongoose = require( 'mongoose' );
var Schema = mongoose.Schema;

var rentingSchema = new Schema({
    _renterFrom: {type: Schema.Types.ObjectId, ref: 'User'},
    _renterTo: {type: Schema.Types.ObjectId, ref: 'User'},
    _product: {type: Schema.Types.ObjectId, ref: 'Product'},
    //fromDate: { type: Date},
    daysToRent: Number//,
    //Approved: Boolean
});

var productSchema = new Schema({
    productName: String,
    pricePerDay: String,
    description: String,
    createdOn: { type: Date, default: Date.now }
});

var userSchema = new Schema({
    lastname: String,
    surname: String,
    emailadres: String,
    products: [productSchema],
    createdOn: { type: Date, default: Date.now }
});

module.exports.rentingModel = mongoose.model('Renting', rentingSchema);
module.exports.productModel = mongoose.model( 'Product', productSchema );
module.exports.userModel = mongoose.model( 'User', userSchema );