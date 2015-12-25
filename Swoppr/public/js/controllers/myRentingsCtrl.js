/**
 * Created by jonah on 12/25/2015.
 */
(function () {
    'use strict';

    angular.module('swoppr')
        .controller('myRentingsCtrl', ['$rootScope', '$scope', 'RentingService', myRentingsCtrl]);

    function myRentingsCtrl($rootScope, $scope, RentingService) {

        if($rootScope.user) {
            var getRentingsByRenterFromSuccessfull = function(renting) {
                $scope.rentingsRenterFrom = renting;
            };

            var getRentingsByRenterFromError = function(err) {
                console.log(err);
            };

            RentingService.byRenterFrom($rootScope.user.id).then(getRentingsByRenterFromSuccessfull, getRentingsByRenterFromError);

            var getRentingsByRenterToSuccessfull = function(renting) {
                $scope.rentingsRenterTo = renting;
            };

            var getRentingsByRenterToError = function(err) {
                console.log(err);
            };

            RentingService.byRenterTo($rootScope.user.id).then(getRentingsByRenterToSuccessfull, getRentingsByRenterToError);
        }
    }
}());