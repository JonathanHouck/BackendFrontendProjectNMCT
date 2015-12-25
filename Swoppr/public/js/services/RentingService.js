/**
 * Created by Greg on 24-Nov-15.
 */
(function(){
    "use strict";

    var RentingService = function($http){

        function makeProduct(p) {
            return new Product(
                p._id,
                p.productName,
                parseInt(p.pricePerDay),
                p.description,
                p.url,
                p.place,
                p.longitude,
                p.latitude
            );
        }

        function makeRenterFrom(rf, product) {
            return new UserWithoutCredentials(
                rf._id,
                rf.firstname,
                rf.surname,
                rf.local.email,
                product
            );
        }

        function makeRenterTo(rt) {
            return new UserWithoutCredentials(
                rt._id,
                rt.firstname,
                rt.surname,
                rt.local.email
            );
        }

        function makeRenting(r, renterFrom, renterTo) {
           return new RentingWithUsers (
                r._id,
                renterFrom,
                renterTo,
                new Date(r.fromDate),
                new Date(r.toDate),
                parseInt(r.daysToRent),
                parseInt(r.totalPrice)
            );
        }

        var byId = function(id){
            var url = '/api/renting/getById/'+id;
            return $http.get(url).then(function(response) {

                if(response.data.error) {
                    return "error";
                }

                var p = response.data.renterFrom.product;
                var product = makeProduct(p);

                var rf = response.data.renterFrom;
                var renterFrom = makeRenterFrom(rf, product);

                var rt = response.data.renterTo;
                var renterTo = makeRenterTo(rt);

                var r = response.data;
                return makeRenting(r, renterFrom, renterTo);
            });
        };

        var byRenterFrom = function(userId) {
            var url =   '/api/renting/getAllRentingsRenterFrom/'+userId;
            return $http.get(url).then(function(response) {
                if(response.data.error) {
                    return "error";
                }

                var rentings = [];
                angular.forEach(response.data, function(r){
                    var p = r.renterFrom.product;
                    var product = makeProduct(p);

                    var rf = r.renterFrom;
                    var renterFrom = makeRenterFrom(rf, product);

                    var rt = r.renterTo;
                    var renterTo = makeRenterTo(rt);
                    rentings.push(makeRenting(r, renterFrom, renterTo));
                });
                return rentings;
            });
        };

        var byRenterTo = function(userId){
            var url =   '/api/renting/getAllRentingsRenterTo/'+userId;
            return $http.get(url).then(function(response) {
                if(response.data.error) {
                    return "error";
                }

                var rentings = [];
                angular.forEach(response.data, function(r){
                    var p = r.renterFrom.product;
                    var product = makeProduct(p);

                    var rf = r.renterFrom;
                    var renterFrom = makeRenterFrom(rf, product);

                    var rt = r.renterTo;
                    var renterTo = makeRenterTo(rt);
                    rentings.push(makeRenting(r, renterFrom, renterTo));
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
            var url =  '/api/renting/newRenting/';
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
            byRenterFrom : byRenterFrom,
            byRenterTo : byRenterTo,
            byProduct : byProduct,
            add : add
            //remove : remove,
            //update : update
        };
    };
    angular.module("swoppr").factory("RentingService", ["$http", RentingService]);
})();

