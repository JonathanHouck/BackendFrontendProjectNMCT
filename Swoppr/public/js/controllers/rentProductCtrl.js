/**
 * Created by jonah on 12/19/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('RentProductCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'ProductService', 'RentingService', RentProductCtrl]);

    function RentProductCtrl($rootScope, $scope, $routeParams, $location, ProductService, RentingService) {

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.user = [];

        var onGetUserWithProductSuccesfull = function(response) {
            $scope.user = response;
        };

        var onGetUserWithProductError = function(err) {
            console.log("error getting user with products");
        };

        var productId = $routeParams.id;
        ProductService.byIdUser(productId).then(onGetUserWithProductSuccesfull, onGetUserWithProductError);

        $scope.setDates = function() {
            $scope.dt1 = new Date();
            $scope.dt2 = new Date($scope.dt1.getDate() +1);
        };

        $scope.setDates();

        $scope.$watch('dt1', function() {
            $scope.setMinDates();

            if($scope.dt1 >= $scope.dt2) {
                $scope.dt2 = new Date($scope.dt1);
                $scope.dt2.setDate($scope.dt2.getDate() +1);
            }

            $scope.dt1.status = {
                opened: false
            };

            $scope.dt1.open = function($event) {
                $scope.dt1.status.opened = true;
            };

            $scope.setDaysToRent();
        });

        $scope.$watch('dt2', function() {
            $scope.setMinDates();

            $scope.dt2.open = function($event) {
                $scope.dt2.status.opened = true;
            };

            $scope.dt2.status = {
                opened: false
            };

            $scope.setDaysToRent();
        });

        $scope.setMinDates = function() {
            $scope.dt1.minDate = new Date();

            $scope.dt2.minDate = new Date($scope.dt1);
            $scope.dt2.minDate.setDate($scope.dt2.minDate.getDate() +1);
        };

        $scope.dateOptions = {
            formatYear: 'yy',
            startingDay: 1
        };

        $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
        $scope.format = $scope.formats[0];

        $scope.$watch('user', function() {
            $scope.setDaysToRent();
        });

        $scope.setDaysToRent = function() {
            var oneDay = 24*60*60*1000;
            $scope.daysToRent = Math.round(Math.abs(($scope.dt1.getTime() - $scope.dt2.getTime())/(oneDay)));

            if ($scope.user.products) $scope.totalPrice = $scope.user.products.pricePerDay * $scope.daysToRent;
        };

        var onAddRentingSuccessfull = function(resp) {
            if (resp.data) {
                if (resp.data.ok) {
                    $location.path('/toRent');
                }
                if (resp.data.error) {
                    $scope.alerts.push({type: 'danger', msg: resp.data.error});
                }
            }
        };

        var onAddRentingError = function(resp) {
            console.log(resp);
        };

        $scope.rentProduct = function() {

            if ($scope.user || $rootScope.user) {
                var renting = new Renting(
                    $scope.user.id,
                    $rootScope.user._id,
                    $scope.user.products.id,
                    $scope.dt1,
                    $scope.dt2,
                    $scope.daysToRent,
                    $scope.totalPrice
                );

                RentingService.add(renting).then(onAddRentingSuccessfull, onAddRentingError);
            }
        };
    }
}());