/**
 * Created by jonah on 11/15/2015.
 */

(function() {
    "use strict";

    var mongoose = require( 'mongoose');
    var bcrypt   = require('bcrypt-nodejs');
    var Schema = mongoose.Schema;

    var rentingSchema = new Schema({
        _renterFrom: {type: Schema.Types.ObjectId, ref: 'User'},
        _renterTo: {type: Schema.Types.ObjectId, ref: 'User'},
        _product: {type: Schema.Types.ObjectId, ref: 'Product'},
        fromDate: { type: Date},
        toDate: { type: Date},
        daysToRent: Number,
        totalPrice: Number,
        createdOn: { type: Date, default: Date.now() + 60 * 60000 }
    }, {collection: 'Rentings'});

    var productSchema = new Schema({
        productName: String,
        pricePerDay: String,
        description: String,
        url: String,
        place: String,
        longitude: String,
        latitude: String,
        isDeleted: {type: Boolean, default: false},
        createdOn: { type: Date, default: Date.now() + 60 * 60000 }
    });

    var userSchema = new Schema({
        firstname: String,
        surname: String,
        products: [productSchema],
        local            : {
            email        : String,
            password     : String
        },
        google           : {
            id           : String,
            token        : String,
            email        : String,
            name         : String
        },
        createdOn: { type: Date, default: Date.now() + 60 * 60000 }
    }, {collection: 'Users'});

    var messageSchema = new Schema({
        _renting: {type: Schema.Types.ObjectId, ref: 'Renting'},
        _sender: {type: Schema.Types.ObjectId, ref: 'User'},
        name: String,
        content: String,
        createdOn: { type: Date}
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
})();
