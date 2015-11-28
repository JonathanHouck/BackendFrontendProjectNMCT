/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('LoginFormCtrl', ['$scope', '$http', LoginFormCtrl]);

    function LoginFormCtrl ($scope, $http) {
        $scope.login = function() {
            $http
                .post('/partials/login', {
                    email: this.email,
                    password: this.password
                })
                .success(function(data) {
                    console.log(data);
                });
        };
    }
}());