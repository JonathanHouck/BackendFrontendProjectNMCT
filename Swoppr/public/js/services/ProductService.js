/**
 * Created by Greg on 24-Nov-15.
 */
(function(){
    "use strict";
    var ProductService = function($http, Upload) {

        var byId = function(id){
            var url =   '/api/product/getById/'+id;
            return $http.get(url).then(function(response) {
                if(response.data.error) {
                    return "error";
                }

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
                    url,
                    p.place,
                    p.longitude,
                    p.latitude
                );

                var u = response.data;
                var User = new UserWithoutCredentials(
                    u._id,
                    u.firstname,
                    u.surname,
                    u.local.email,
                    product
                );

                return User;
            });
        };

        var all = function(){
            var url = '/api/product/getAll/';
            return $http.get(url).then(function(response) {
                if(response.data.error) {
                    return "error";
                }

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

        var add = function(file, data) {
            var url = '/api/product/newProduct/';
            if (file) {
                var result = file.upload = Upload.upload({
                    url: url,
                    file: file,
                    data: data
                }).then(function(response) {
                    return response;
                });

                return result;
            } else {
                return $http.post(url, data).then(function(response) {
                    return response;
                });
            }
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
    angular.module("swoppr").factory("ProductService", ["$http", "Upload", ProductService]);
})();