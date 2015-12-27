/**
 * Created by jonah on 12/27/2015.
 */
(function () {
    'use strict';

    angular.module('swoppr')
        .controller('MyProductsCtrl', ['$rootScope', '$scope', '$uibModal', MyProductsCtrl]);

    function MyProductsCtrl($rootScope, $scope, $uibModal) {

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