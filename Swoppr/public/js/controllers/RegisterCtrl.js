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
    }
}());