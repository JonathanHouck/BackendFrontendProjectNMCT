/**
 * Created by jonah on 12/4/2015.
 */

(function () {
    'use strict';
    angular.module('swoppr')
        .controller('PlaceArticleCtrl', ['$rootScope', '$scope', 'Upload', PlaceArticleCtrl]);

    function PlaceArticleCtrl ($rootScope, $scope, Upload) {
        /*$scope.getUsers = function() {
            if ($rootScope.user) {
                $http.get('/api/user/getById/' + $rootScope.user._id)
                    .success(function(data) {
                        $scope.products = data.products;
                });
            }
        };

        $scope.getUsers();*/

        $scope.uploadFile = function(file) {
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
        };
    }
}());