/**
 * Created by jonah on 1/4/2016.
 */
(function() {
    "use strict";

    var mongoose = require('mongoose');
    var ProductSchema = require("./product");

    var UserSchema = new mongoose.Schema({
        firstname: String,
        surname: String,
        products: [ProductSchema],
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
    });

    // generating a hash
    UserSchema.methods.generateHash = function(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    };

    // checking if password is valid
    UserSchema.methods.validPassword = function(password) {
        return bcrypt.compareSync(password, this.local.password);
    };

    module.exports = UserSchema;
})();