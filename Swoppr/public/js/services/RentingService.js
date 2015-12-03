/**
 * Created by Greg on 24-Nov-15.
 */
(function(){
    "use strict";

    var ProductService = function($http){
        var Renting = require("../models/swoppr.schema.js").rentingModel;

        var byId = function(id){
            var url =   '/api/renting/getById/'+id;
            $http.get(url).then(function(response) {
                var rentings = [];
                angular.forEach(response.data, function(r){
                    var renting = new Renting(
                        r.renterFrom,
                        r.renterTo,
                        r.product,
                        r.daysToRent
                    );

                    rentings.push(renting);
                });
                return rentings;
            });
        };

        var byUser = function(userId){
            var url =   '/api/renting/getAllRentingsRenterFrom/'+userId;
            $http.get(url).then(function(response) {
                var rentings = [];
                angular.forEach(response.data, function(r){
                    var renting = new Renting(
                        r.renterFrom,
                        r.renterTo,
                        r.product,
                        r.daysToRent
                    );

                    rentings.push(renting);
                });
                return rentings;
            });
        };

        var byRenter = function(userId){
            var url =   '/api/renting/getAllRentingsRenterTo/'+userId;
            $http.get(url).then(function(response) {
                var rentings = [];
                angular.forEach(response.data, function(r){
                    var renting = new Renting(
                        r.renterFrom,
                        r.renterTo,
                        r.product,
                        r.daysToRent
                    );

                    rentings.push(renting);
                });
                return rentings;
            });
        };

        var byProduct = function(){
            var url =   '/api/renting/getAllRentingsProduct/';
            $http.get(url).then(function(response) {
                var rentings = [];
                angular.forEach(response.data, function(r){
                    var renting = new Renting(
                        r.renterFrom,
                        r.renterTo,
                        r.product,
                        r.daysToRent
                    );

                    rentings.push(renting);
                });
                return rentings;
            });
        };

        var add = function(renting){
            var url =   '/api/renting/newRenting/';
            $http.put(url, renting).then(function(response) {
                return response; //Expose the user data to your angular scope
            });
        };

        //var remove = function(){
        //    var url =   '/api/renting/getById/'+id;
        //    $http.get(url)
        //        .then(function(response) {
        //            return response; //Expose the user data to your angular scope
        //        });
        //};
        //
        //
        //var update = function(){
        //    var url =   '/api/renting/getById/'+id;
        //    $http.get(url)
        //        .then(function(response) {
        //            return response; //Expose the user data to your angular scope
        //        });
        //};

        return {
            byId : byId,
            byUser : byUser,
            byRenter : byRenter,
            byProduct : byProduct,
            add : add,
            //remove : remove,
            //update : update
        }
    }
})();

