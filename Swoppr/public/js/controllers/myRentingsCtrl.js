/**
 * Created by jonah on 12/25/2015.
 */
(function () {
    'use strict';

    angular.module('swoppr')
        .controller('MyRentingsCtrl', ['$rootScope', '$scope', '$uibModal', 'RentingService', MyRentingsCtrl]);

    function MyRentingsCtrl($rootScope, $scope, $uibModal, RentingService) {

        $rootScope.$watch('user', function() {
            if ($rootScope.user) {
                var getRentingsByRenterFromSuccessfull = function(renting) {
                    $rootScope.rentingsRenterFrom = renting;
                };

                var getRentingsByRenterFromError = function(err) {
                    console.log(err);
                };

                RentingService.byRenterFrom($rootScope.user.id).then(getRentingsByRenterFromSuccessfull, getRentingsByRenterFromError);

                var getRentingsByRenterToSuccessfull = function(renting) {
                    $rootScope.rentingsRenterTo = renting;
                };

                var getRentingsByRenterToError = function(err) {
                    console.log(err);
                };

                RentingService.byRenterTo($rootScope.user.id).then(getRentingsByRenterToSuccessfull, getRentingsByRenterToError);

                $scope.animationsEnabled = true;

                $scope.open = function (id, product, who) {
                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: '../templates/myModalContent.html',
                        controller: 'ModalInstanceCtrl',
                        resolve: {
                            id: function () {
                                return id;
                            },
                            product: function() {
                                return product;
                            },
                            who: function() {
                                return who;
                            }
                        }
                    });
                };
            }
        });
    }
}());