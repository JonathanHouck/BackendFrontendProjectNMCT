/**
 * Created by jonah on 11/14/2015.
 */
(function () {
    'use strict';

    angular.module('swoppr')
        .controller('DetailProductCtrl', ['$scope', '$routeParams', 'ProductService', DetailProductCtrl]);

    function DetailProductCtrl($scope, $routeParams, ProductService) {
        $scope.user = [];

        var onGetUserWithProductSuccesfull = function(user) {
            $scope.user = user;

            $scope.map = {center: {latitude: $scope.user.product.latitude, longitude: $scope.user.product.longitude }, zoom: 16 };
            $scope.marker = {
                id: 0,
                coords: {
                    latitude: $scope.user.product.latitude,
                    longitude: $scope.user.product.longitude
                }
            };

        };

        var onGetUserWithProductError = function(err) {
            console.log(err);
        };

        var productId = $routeParams.id;
        ProductService.byIdUser(productId).then(onGetUserWithProductSuccesfull, onGetUserWithProductError);
    }
}());