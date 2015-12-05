/**
 * Created by jonah on 12/4/2015.
 */

(function () {
    'use strict';
    angular.module('swoppr')
        .controller('FileUploadCtrl', ['$rootScope', '$scope', '$http', 'Upload', FileUploadCtrl]);

    function FileUploadCtrl ($rootScope, $scope, $http, Upload) {
        $scope.getUsers = function() {
            if ($rootScope.user) {
                $http.get('/api/user/getById/' + $rootScope.user._id)
                    .success(function(data) {
                        $scope.products = data.products;
                });
            }
        };

        $scope.getUsers();

        $scope.uploadFile = function(file) {
            file.upload = Upload.upload({
                url: '/api/fileUpload',
                file: file,
                data: {
                    userId: $rootScope.user._id,
                    productName: $scope.productName
                }
            }).then(function(resp) {
                if (resp.data.ok) {
                    $scope.products.push(resp.data.ok);
                }
            });
        };
    }
}());

function getProducts() {
    $rootScope.$watch('user', function() {
        $http.get('/api/user/getById/' + $rootScope.user._id)
            .success(function(data) {
                $scope.products = data.products;
            });
    });
}