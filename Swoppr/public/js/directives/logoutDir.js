/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .directive('logout', ['$rootScope', 'UserService', logoutDir]);

    function logoutDir ($rootScope, UserService) {
        return {
            restrict: 'A',
            link: function(scope, element) {
                element.on('click', function(e) {
                    e.preventDefault();

                    function successLogout(response) {
                        $rootScope.user = "";
                    }

                    function errorLogout(response) {
                        console.log(response);
                    }

                    UserService.logout().then(successLogout, errorLogout);
                });
            }
        };
    }
}());