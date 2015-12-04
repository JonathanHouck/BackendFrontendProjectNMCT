/**
 * Created by jonah on 11/15/2015.
 */
var mongoose = require( 'mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var rentingSchema = new Schema({
    _renterFrom: {type: Schema.Types.ObjectId, ref: 'User'},
    _renterTo: {type: Schema.Types.ObjectId, ref: 'User'},
    _product: {type: Schema.Types.ObjectId, ref: 'Product'},
    //fromDate: { type: Date},
    daysToRent: Number//,
    //Approved: Boolean
}, {collection: 'Rentings'});

var productSchema = new Schema({
    productName: String,
    pricePerDay: String,
    description: String,
    url: String,
    createdOn: { type: Date, default: Date.now }
});

var userSchema = new Schema({
    firstname: String,
    surname: String,
    emailadres: String,
    products: [productSchema],
    createdOn: { type: Date, default: Date.now },

    local            : {
        email        : String,
        password     : String
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
}, {collection: 'Users'});

var messageSchema = new Schema({
    //_renting: {type: Schema.Types.ObjectId, ref: 'Renting'},
    _renting: String,
    content: String,
    name: String,
    createdOn: { type: Date, default: Date.now }
}, {collection: 'Messages'});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports.rentingModel = mongoose.model('Renting', rentingSchema);
module.exports.productModel = mongoose.model('Product', productSchema );
module.exports.userModel = mongoose.model('User', userSchema );
module.exports.messageModel = mongoose.model('Message', messageSchema);