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

        var byIdUser = function(productId){
            var url = '/api/product/getByIdUser/' + productId;
            return $http.get(url).then(function(response) {

                if(response.data.error) {
                    return "error";
                }

                var p = response.data.product;
                var url = p.url ? p.url : '/';

                var product = new Product(
                    p._id,
                    p.productName,
                    parseInt(p.pricePerDay),
                    p.description,
                    url
                );

                var UserOneProduct = new User(
                    response.data._id,
                    response.data.firstname,
                    response.data.surname,
                    response.data.local.email,
                    product
                );

                return UserOneProduct;
            });
        };

        var all = function(){
            var url = '/api/product/getAll/';
            return $http.get(url).then(function(response) {
                var products = [];
                angular.forEach(response.data, function(p){

                    var product = new Product(
                        p._id,
                        p.productName,
                        parseInt(p.pricePerDay),
                        p.description,
                        p.url
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