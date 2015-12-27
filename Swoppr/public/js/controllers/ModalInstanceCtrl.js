/**
 * Created by jonah on 12/26/2015.
 */
(function () {
    'use strict';

    angular.module('swoppr')
            .controller('ModalInstanceCtrl', ['$rootScope', '$scope', '$uibModalInstance', '$filter', 'RentingService', 'ProductService', 'id', 'product', 'who', ModalInstanceCtrl]);

    function ModalInstanceCtrl($rootScope, $scope, $uibModalInstance, $filter, RentingService, ProductService, id, product, who) {

        if (who == "product") {
            $scope.title = "Verwijderen product";
            $scope.message = "Bent u zeker dat u het artikel " + product + " wilt verwijderen?";
        } else if (who == "renting.renterFrom" || who == "renting.renterTo") {
            $scope.title = "Verwijderen verhuring";
            $scope.message = "Bent u zeker dat u de verhuring voor het artikel " + product + " wilt verwijderen?";
        }

        $scope.delete = function () {
            function RemoveProductSuccessfull(response) {
                if (response.data.ok) {
                    var productToDelete;
                    productToDelete = $filter('filter')($rootScope.user.products, function(r) {
                        return r.id === response.data.ok;
                    })[0];
                    var indexProductToDelete = $rootScope.user.products.indexOf(productToDelete);

                    $rootScope.user.products[indexProductToDelete].isDeleted = true;
                }

                if (response.data.error) {
                    console.log(response.data.error);
                }
            }

            function RemoveProductError(response) {
                console.log(response);
            }

            function RemoveRentingSuccessfull(response) {

                if (response.data.ok) {
                    var rentingToDelete;
                    var indexRentingToDelete;

                    //kijken uit welke $rootScope de renting verwijderd moet worden
                    if (who == "renting.renterFrom") {
                        rentingToDelete = $filter('filter')($rootScope.rentingsRenterFrom, function(r) {
                            return r.id === response.data.ok;
                        })[0];
                        indexRentingToDelete = $rootScope.rentingsRenterTo.indexOf(rentingToDelete);

                        $rootScope.rentingsRenterFrom.splice(indexRentingToDelete, 1);

                    } else if (who == "renting.renterTo") {
                        rentingToDelete = $filter('filter')($rootScope.rentingsRenterTo, function(r) {
                            return r.id === response.data.ok;
                        })[0];
                        indexRentingToDelete = $rootScope.rentingsRenterTo.indexOf(rentingToDelete);

                        $rootScope.rentingsRenterTo.splice(indexRentingToDelete, 1);
                    }
                }

                if (response.data.error) {
                    console.log(response.data.error);
                }
            }

            function RemoveRentingError(response) {
                console.log(response);
            }

            if (who == "product") {
                ProductService.remove(id).then(RemoveProductSuccessfull, RemoveProductError);
            } else if (who == "renting.renterFrom" || who == "renting.renterTo") {
                RentingService.remove(id).then(RemoveRentingSuccessfull, RemoveRentingError);
            }

            $uibModalInstance.close();
        };

        $scope.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    }
}());