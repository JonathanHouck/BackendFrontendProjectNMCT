/**
 * Created by jonah on 12/26/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('EditRentingCtrl', ['$rootScope', '$scope', '$routeParams', '$location', 'RentingService', EditRentingCtrl]);

    function EditRentingCtrl($rootScope, $scope, $routeParams, $location, RentingService) {

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        var onGetRentingSuccesfull = function(renting) {
            if (typeof renting === "string") {
                if (renting == "error") {
                    $scope.whoRents = 'noRenting';
                    return;
                }
            //renterFrom kan verhuring niet bewerken
            } else if ($rootScope.user.id == renting.renterFrom.id) {
                $scope.whoRents = 'noAccess';
                return;
            } else if ($rootScope.user.id == renting.renterTo.id) {

                $scope.whoRents = 'renterTo';
                $scope.renting = renting;

                $scope.$watch('renting.fromDate', function() {
                    $scope.setMinDates();

                    if($scope.renting.fromDate >= $scope.renting.toDate) {
                        $scope.renting.toDate = new Date($scope.renting.fromDate);
                        $scope.renting.toDate.setDate($scope.renting.toDate.getDate() +1);
                    }

                    $scope.renting.fromDate.status = {
                        opened: false
                    };

                    $scope.renting.fromDate.open = function($event) {
                        $scope.renting.fromDate.status.opened = true;
                    };

                    $scope.setDaysToRent();
                });

                $scope.$watch('renting.toDate', function() {
                    $scope.setMinDates();

                    $scope.renting.toDate.open = function($event) {
                        $scope.renting.toDate.status.opened = true;
                    };

                    $scope.renting.toDate.status = {
                        opened: false
                    };

                    $scope.setDaysToRent();
                });

                $scope.setMinDates = function() {
                    $scope.renting.fromDate.minDate = new Date();

                    $scope.renting.toDate.minDate = new Date($scope.renting.fromDate);
                    $scope.renting.toDate.minDate.setDate($scope.renting.toDate.minDate.getDate() +1);
                };

                $scope.dateOptions = {
                    formatYear: 'yy',
                    startingDay: 1
                };

                $scope.format = 'dd/MM/yyyy';

                $scope.$watch('renting.renterFrom', function() {
                    $scope.setDaysToRent();
                });

                $scope.setDaysToRent = function() {
                    var oneDay = 24*60*60*1000;
                    $scope.renting.daysToRent = Math.round(Math.abs(($scope.renting.fromDate.getTime() - $scope.renting.toDate.getTime())/(oneDay)));

                    if ($scope.renting.renterFrom.product) $scope.renting.totalPrice = $scope.renting.renterFrom.product.pricePerDay * $scope.renting.daysToRent;
                };

            } else {
                $scope.whoRents = 'noAccess';
                return;
            }
        };

        //messages ophalen
        var onGetRentingError = function(err) {
            console.log(err);
        };

        var rentingId = $routeParams.id;
        RentingService.byId(rentingId).then(onGetRentingSuccesfull, onGetRentingError);

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

        $scope.editRenting = function() {

            if ($rootScope.user && $scope.renting) {
                var renting = new Renting(
                    $scope.renting.id,
                    $scope.renting.renterFrom.id,
                    $scope.renting.renterTo.id,
                    $scope.renting.renterFrom.product.id,
                    $scope.renting.fromDate,
                    $scope.renting.toDate,
                    $scope.renting.daysToRent,
                    $scope.renting.totalPrice
                );

                RentingService.edit(renting).then(onAddRentingSuccessfull, onAddRentingError);
            }
        };
    }
}());