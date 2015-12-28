/**
 * Created by jonah on 12/27/2015.
 */
(function () {
    'use strict';

    angular.module('swoppr')
        .controller('MyProductsCtrl', ['$rootScope', '$scope', '$uibModal', 'UserService', MyProductsCtrl]);

    function MyProductsCtrl($rootScope, $scope, $uibModal, UserService) {

        $scope.sortType = "productName";

        $rootScope.user.products = "loading";

        function succesUserData(data) {
            if (data) {
                if (data.error) {
                    $rootScope.user.products = "";
                } else {
                    $rootScope.user.products = data.products;
                }
            }
        }

        function errorUserData(response) {
            console.log(response);
        }

        UserService.userData().then(succesUserData, errorUserData);

        $rootScope.$watch('user', function() {
            if ($rootScope.user) {
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