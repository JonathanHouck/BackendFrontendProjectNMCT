/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('RegisterFormCtrl', ['$scope', '$http', RegisterFormCtrl]);
    function RegisterFormCtrl ($scope, $http) {
        $scope.register = function() {
            $http
                .post('/partials/register', {
                    surname: this.surname,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password
                })
                .success(function(data) {
                    if (data.error) {
                        $scope.registerForm.general.$setValidity('server', false);
                    }

                    if (data.errorEmail) {
                        $scope.registerForm.email.$setValidity('server', false);
                    }
                });
        };
    }
}());