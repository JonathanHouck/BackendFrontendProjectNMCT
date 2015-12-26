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

        var productId = $routeParams.id;
        var onGetUserWithProductSuccesfull = function(data) {

            if ($rootScope.user.id == data.id) {
                $location.path("detailProduct/" + productId);
            } else {
                $scope.user = data;
            }
        };

        var onGetUserWithProductError = function(err) {
            console.log(err);
        };

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

            if ($scope.user.product) $scope.totalPrice = $scope.user.product.pricePerDay * $scope.daysToRent;
        };

        var onAddRentingSuccessfull = function(resp) {
            if (resp.data) {
                if (resp.data.ok) {
                    $location.path('/detailRenting/' + resp.data.ok._id);
                }
                if (resp.data.error) {
                    $scope.alerts.push({type: 'danger', msg: resp.data.error});
                }
            }
        };

        var onAddRentingError = function(err) {
            console.log(err);
        };

        $scope.rentProduct = function() {

            if ($rootScope.user && $scope.user) {
                var renting = new Renting();
                renting.renterFrom = $scope.user.id;
                renting.renterTo = $rootScope.user.id;
                renting.productId = $scope.user.product.id;
                renting.fromDate = $scope.dt1;
                renting.toDate = $scope.dt2;
                renting.daysToRent = $scope.daysToRent;
                renting.totalPrice = $scope.totalPrice;

                RentingService.add(renting).then(onAddRentingSuccessfull, onAddRentingError);
            }
        };
    }
}());