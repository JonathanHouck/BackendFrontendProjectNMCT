/**
 * Created by Greg on 24-Nov-15.
 */
(function(){
    "use strict";

    var RentingService = function($http){
        var byId = function(id){
            var url = '/api/renting/getById/'+id;
            return $http.get(url).then(function(response) {

                if(response.data.error) {
                    return "error";
                }

                var p = response.data.renterFrom.product;
                var product = new Product(
                    p._id,
                    p.productName,
                    parseInt(p.pricePerDay),
                    p.description,
                    p.url,
                    p.place,
                    p.longitude,
                    p.latitude
                );

                var rf = response.data.renterFrom;
                var renterFrom = new UserWithoutCredentials(
                    rf._id,
                    rf.firstname,
                    rf.surname,
                    rf.local.email,
                    product
                );

                var rt = response.data.renterTo;
                var renterTo = new UserWithoutCredentials(
                    rt._id,
                    rt.firstname,
                    rt.surname,
                    rt.local.email
                );

                var r = response.data;
                var renting = new Renting (
                    r._id,
                    renterFrom,
                    renterTo,
                    r.fromDate,
                    r.toDate,
                    r.daysToRent,
                    r.totalPrice
                );

                return renting;
            });
        };

        var byUser = function(userId){
            var url =   '/api/renting/getAllRentingsRenterTo/'+userId;
            return $http.get(url).then(function(response) {
                if(response.data.error) {
                    return "error";
                }

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
            var url =   '/api/renting/getAllRentingsRenterFrom/'+userId;
            return $http.get(url).then(function(response) {
                if(response.data.error) {
                    return "error";
                }

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

        var byProduct = function(id){
            var url =   '/api/renting/getAllRentingsProduct/' + id;
            return $http.get(url).then(function(response) {
                if(response.data.error) {
                    return "error";
                }

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
            return $http.post(url, renting).then(function(response) {
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
            add : add
            //remove : remove,
            //update : update
        };
    };
    angular.module("swoppr").factory("RentingService", ["$http", RentingService]);
})();

