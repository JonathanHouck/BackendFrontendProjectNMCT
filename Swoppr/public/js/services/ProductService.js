/**
 * Created by Greg on 24-Nov-15.
 */
(function(){
    "use strict";
    var ProductService = function($http){

        var byId = function(id){
            var url =   '/api/product/getById/'+id;
            return $http.get(url).then(function(response) {
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
            return $http.get(url).then(function(response) {
                var user = new User();
                user.firstname = response.data.firstname;
                user.lastname = response.data.lastname;
                user.emailadres = response.data.local.email;

                var p = response.data.product;
                var product = new Product(
                    p.productName,
                    p.pricePerDay,
                    p.description,
                    p.url,
                    p.createdOn,
                    p.userId
                );

                user.products = product;
                return user;
            });
        };

        var all = function(){
            var url =   '/api/product/getAll/';
            return $http.get(url).then(function(response) {
                var products = [];
                angular.forEach(response.data, function(p){
                    var product = new Product(
                        p.productName,
                        parseInt(p.pricePerDay),
                        p.description,
                        p.url,
                        p._id
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
            $http.get(url).then(function(response) {
                return response;
            });
        };

        var update = function(){
            var url =   '/api/product/editProductUser/';
            $http.post(url) .then(function(response) {
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
        };
    };
    angular.module("swoppr").factory("ProductService", ["$http", ProductService]);
})();