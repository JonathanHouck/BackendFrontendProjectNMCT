/**
 * Created by jonah on 12/4/2015.
 */

(function () {
    'use strict';
    angular.module('swoppr')
        .controller('PlaceArticleCtrl', ['$rootScope', '$scope', '$http', 'Upload', PlaceArticleCtrl]);

    function PlaceArticleCtrl ($rootScope, $scope, $http, Upload) {
        $scope.uploadFile = function(file) {
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/product/newProduct',
                    file: file,
                    data: {
                        userId: $rootScope.user._id,
                        productName: $scope.productName,
                        pricePerDay: $scope.pricePerDay,
                        description: $scope.description
                    }
                }).then(function(resp) {
                    if (resp.data.ok) {
                        $rootScope.user.products.push(resp.data.ok);
                    }
                });
            } else {
                $http
                    .post('/api/product/newProduct', {
                        userId: $rootScope.user._id,
                        productName: $scope.productName,
                        pricePerDay: $scope.pricePerDay,
                        description: $scope.description
                    }).then(successCallback, errorCallback);
            }

            function successCallback(resp) {
                if (resp.data) {
                    if (resp.data.ok) {
                        $rootScope.user.products.push(resp.data.ok);
                    }
                }
            }

            function errorCallback(response) {
                console.log(response);
            }
        };
    }
}());