/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('LoginCtrl', ['$rootScope', '$scope', '$http', LoginCtrl]);

    function LoginCtrl ($rootScope, $scope, $http) {
        $scope.login = function() {
            $http
                .post('/partials/login', {
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