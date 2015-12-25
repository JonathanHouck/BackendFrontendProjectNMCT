/**
 * Created by jonah on 12/12/2015.
 */

(function () {
    'use strict';
    angular.module('swoppr')
        .controller('ToRentCtrl', ['$scope', 'ProductService', ToRentCtrl]);

    function ToRentCtrl($scope, ProductService) {
        var onGetProductsSuccesfull = function(response) {
            $scope.products = response;
        };

        var onGetProductsError = function(err) {
            console.log(err);
        };

        ProductService.all().then(onGetProductsSuccesfull, onGetProductsError);

        $scope.sortProperty = "pricePerDay";
    }
}());