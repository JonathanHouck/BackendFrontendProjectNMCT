/**
 * Created by Greg on 24-Nov-15.
 */


    "use strict";
    var ProductService = (function($http, Upload) {

        function makeProduct(p) {
            var url = p.url ? p.url : '/';

            return new Product(
                p._id,
                p.productName,
                p.pricePerDay,
                p.description,
                url,
                p.publicid,
                p.place,
                p.longitude,
                p.latitude,
                p.isDeleted
            );
        }

        var byId = function(id){
            var url =   '/api/product/getById/'+id;
            return $http.get(url).then(function(response) {
                if(response.data.error) {
                    return "error";
                }

                var p = response.data.ok;
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

                var p = response.data.ok.product;
                var product = makeProduct(p);

                var u = response.data.ok;
                return new UserWithoutCredentials(
                    u._id,
                    u.firstname,
                    u.surname,
                    u.local.email,
                    product
                );
            });
        };

        var all = function(){
            var url = '/api/product/getAll/';
            return $http.get(url).then(function(response) {
                if(response.data.error) {
                    return "error";
                }

                var products = [];
                angular.forEach(response.data.ok, function(p){
                    if (p.isDeleted === false) {
                        var product = makeProduct(p);
                        products.push(product);
                    }
                });
                return products;
            });
        };

        var add = function(file, data) {
            var url = '/api/product/newProduct/';
            if (file) {
                var uploader = file.upload = Upload.upload({
                    url: url,
                    file: file,
                    data: data
                }).then(function(response) {
                    return response;
                });
                return uploader;
            } else {
                return $http.post(url, data).then(function(response) {
                    return response;
                });
            }
        };

        var edit = function(file, data) {
            var url = '/api/product/editProduct/';
            if (file) {
                var uploader = file.upload = Upload.upload({
                    url: url,
                    file: file,
                    data: data
                }).then(function(response) {
                    return response;
                });
                return uploader;
            } else {
                return $http.post(url, data).then(function(response) {
                    return response;
                });
            }
        };

        var remove = function(id){
            var url =  '/api/product/removeById/'+id;
            return $http.get(url).then(function(response) {
                return response;
            });
        };

        return {
            byId : byId,
            byIdUser : byIdUser,
            all : all,
            add : add,
            edit : edit,
            remove : remove
        };
        })();

    angular.module("swoppr").factory("ProductService", ["$http", "Upload", ProductService]);
