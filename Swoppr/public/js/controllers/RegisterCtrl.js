/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('RegisterCtrl', ['$scope', '$http', RegisterCtrl]);

    function RegisterCtrl ($scope, $http) {
        $scope.register = function() {

            $scope.formErrors = {};
            $http
                .post('/partials/register', {
                    firstname: this.firstname,
                    surname: this.surname,
                    email: this.email,
                    password: this.password
                })
                .success(function(data) {
                });
        };
    }
}());