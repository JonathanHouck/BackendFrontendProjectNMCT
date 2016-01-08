/**
 * Created by jonah on 1/4/2016.
 */
(function() {
    "use strict";

    var mongoose = require('mongoose');
    var ProductSchema = require("./product");
    var bcrypt = require("bcrypt-nodejs");

    var maxlength = [50, 'The value exceeeds the allowed length {MAXLENGTH}'];
    //var matchEmail =  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Email address is not valid'];

    var UserSchema = new mongoose.Schema({
        firstname:  {type: String, required: 'firstname is required', maxlength: maxlength},
        surname: {type: String, required: 'surname is required', maxlength: maxlength},
        products: [ProductSchema],
        local            : {
            email        : {type: String, required: 'email is required'},
            password     : {type: String, required: 'password is required'}
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