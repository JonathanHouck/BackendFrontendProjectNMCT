/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('RegisterFormCtrl', ['$scope', '$http', RegisterFormCtrl]);
    function RegisterFormCtrl ($scope, $http) {
        $scope.register = function() {

            $scope.formErrors = {};
            $http
                .post('/partials/register', {
                    surname: this.surname,
                    lastname: this.lastname,
                    email: this.email,
                    password: this.password
                })
                .success(function(data) {
                });
        };
    }
}());