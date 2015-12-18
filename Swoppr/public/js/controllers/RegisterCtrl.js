/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('RegisterCtrl', ['$rootScope', '$scope', '$http', RegisterCtrl]);

    function RegisterCtrl ($rootScope, $scope, $http) {

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.register = function() {

            $http
                .post('/partials/register', {
                    firstname: this.firstname,
                    surname: this.surname,
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
                if ($scope.registerForm.firstname.$dirty && $scope.registerForm.firstname.$invalid) return 'has-error';
                if ($scope.registerForm.firstname.$dirty && $scope.registerForm.firstname.$valid) return "has-success";
            } else if (field == 2) {
                if ($scope.registerForm.surname.$dirty && $scope.registerForm.surname.$invalid) return 'has-error';
                if ($scope.registerForm.surname.$dirty && $scope.registerForm.surname.$valid) return "has-success";
            }  else if (field == 3) {
                if ($scope.registerForm.email.$dirty && $scope.registerForm.email.$invalid) return 'has-error';
                if ($scope.registerForm.email.$dirty && $scope.registerForm.email.$valid) return "has-success";
            } else if (field == 4) {
                if ($scope.registerForm.password.$dirty && $scope.registerForm.password.$invalid) return 'has-error';
                if ($scope.registerForm.password.$dirty && $scope.registerForm.password.$valid) return "has-success";
            }  else if (field == 5) {
                if ($scope.registerForm.passwordAgain.$dirty && $scope.registerForm.passwordAgain.$invalid) return 'has-error';
                if ($scope.registerForm.passwordAgain.$dirty && $scope.registerForm.passwordAgain.$valid) return "has-success";
            }
        };
    }
}());