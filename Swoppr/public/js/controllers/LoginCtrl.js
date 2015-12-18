/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('LoginCtrl', ['$rootScope', '$scope', '$http', LoginCtrl]);

    function LoginCtrl ($rootScope, $scope, $http) {

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.login = function() {
            $http
                .post('/partials/login', {
                    email: this.email,
                    password: this.password
                }).then(successCallback, errorCallback);

            function successCallback(response) {
                if (response.data) {
                    if (response.data.error) {
                        $scope.alerts.push({type: 'danger', msg: response.data.error});
                    }
                }

                $http.get('/api/user/userDataNavbar/' + new Date().getTime())
                    .success(function(data) {
                        $rootScope.user = data;
                    });
            }
            function errorCallback(response) {
                console.log(response);
            }
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