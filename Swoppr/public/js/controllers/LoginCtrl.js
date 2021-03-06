/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('LoginCtrl', ['$rootScope', '$scope', 'UserService', LoginCtrl]);

    function LoginCtrl ($rootScope, $scope, UserService) {

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.login = function() {

            function successLogin(response) {
                if (response.data) {
                    if (response.data.error) {
                        $scope.alerts.push({type: 'danger', msg: response.data.error});
                    }
                }

                function successUserData(data) {
                    $rootScope.user = data;
                }

                function errorUserData(data) {
                    console.log(data);
                }

                UserService.userData().then(successUserData, errorUserData);
            }
            function errorLogin(response) {
                console.log(response);
            }

            UserService.login({email: this.email, password: this.password}).then(successLogin, errorLogin);
        };

        $scope.validate = function(field) {
            if (field == 1) {
                if ($scope.loginForm.email.$dirty && $scope.loginForm.email.$invalid) return 'has-error';
                if ($scope.loginForm.email.$dirty && $scope.loginForm.email.$valid) return "has-success";
            } else if (field == 2) {
                if ($scope.loginForm.password.$dirty && $scope.loginForm.password.$invalid) return 'has-error';
                if ($scope.loginForm.password.$dirty && $scope.loginForm.password.$valid) return "has-success";
            }
        };
    }
}());