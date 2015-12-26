/**
 * Created by jonah on 12/26/2015.
 */
(function () {
    'use strict';

    angular.module('swoppr')
            .controller('ModalInstanceCtrl', ['$rootScope', '$scope', '$uibModalInstance', '$filter', 'RentingService', 'id', 'product', 'who', ModalInstanceCtrl]);

    function ModalInstanceCtrl($rootScope, $scope, $uibModalInstance, $filter, RentingService, id, product, who) {

        $scope.message = "Bent u zeker dat u de verhuring voor het artikel " + product + " wilt verwijderen?";

        $scope.delete = function () {

            function RemoveRentingSuccessfull(response) {

                if (response.data.ok) {
                    var rentingToDelete;

                    //kijken uit welke $rootScope de renting verwijderd moet worden
                    if (who == "renting.renterFrom") {
                        rentingToDelete = $filter('filter')($rootScope.rentingsRenterFrom, function(r) {
                            return r.id === response.data.ok;
                        })[0];

                        $rootScope.rentingsRenterFrom.splice(rentingToDelete, 1);

                    } else if (who == "renting.renterTo") {
                        rentingToDelete = $filter('filter')($rootScope.rentingsRenterTo, function(r) {
                            return r.id === response.data.ok;
                        })[0];

                        $rootScope.rentingsRenterTo.splice(rentingToDelete, 1);
                    }
                }

                if (response.data.error) {
                    console.log(response.data.error);
                }
            }

            function RemoveRentingError(response) {
                console.log(response);
            }

            RentingService.remove(id).then(RemoveRentingSuccessfull, RemoveRentingError);

            console.log("delete: " + id);
            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
}());