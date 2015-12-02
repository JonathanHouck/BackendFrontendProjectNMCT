/**
 * Created by Greg on 24-Nov-15.
 */
(function(){
    "use strict";
    var ProductService = function($http){
        var Product = require("../models/swoppr.model.js").productModel;
        var User = require("../models/swoppr.model.js").userModel;

        var byId = function(id){
            var url =   '/api/product/getById/'+id;
            $http.get(url).then(function(response) {
                var p = response.data;
                return new Product(
                    p.productName,
                    p.pricePerDay,
                    p.description,
                    p.createdOn
                );
            });
        };

        var byIdUser = function(userId){
            var url = '/api/product/getByIdUser/'+userId;
            $http.get(url).then(function(response) {
                var user = new User();
                user.firstname = response.firstname;
                user.lastname = response.lastname;
                user.emailadres = response.local.email;

                var p = response.data.product;
                var product = new Product(
                    p.productName,
                    p.pricePerDay,
                    p.description,
                    p.createdOn
                );

                user.products.push(product);
                return user;
            });
        };

        var all = function(){
            var url =   '/api/product/getAll/';
            $http.get(url).then(function(response) {
                var products = [];
                angular.forEach(response.data, function(p){
                    var product = new Product(
                        p.productName,
                        p.pricePerDay,
                        p.description,
                        p.createdOn
                    );

                    products.push(product);
                });
                return products;
            });
        };

        var add = function(userId, product){
            var url = '/api/product/newProduct/';
            product.userId = userId;
            $http.put(url, product).then(function(response){
                return response;
            });
        };

        var remove = function(id){
            var url =  '/api/product/removeProductUser/'+id;
            $http.delete(url).then(function(response) {
                return response;
            });
        };

        var update = function(){
            var url =   '/api/product/editProductUser/';
            $http.get(url) .then(function(response) {
                return response; //Expose the user data to your angular scope
            });
        };

        return {
            byId : byId,
            byIdUser : byIdUser,
            all : all,
            add : add,
            remove : remove,
            update : update
        }
    }
})();