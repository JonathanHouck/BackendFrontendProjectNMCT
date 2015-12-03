/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('RegisterCtrl', ['$rootScope', '$scope', '$http', RegisterCtrl]);

    function RegisterCtrl ($rootScope, $scope, $http) {
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
                    $http.get('/api/user/userDataNavbar')
                        .success(function(data) {
                            $rootScope.user = data;
                    });
                });
        };
    }
}());