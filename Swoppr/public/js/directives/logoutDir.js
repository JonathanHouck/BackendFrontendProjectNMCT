/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .directive('logout', ['$rootScope', '$http', logoutDir]);

    function logoutDir ($rootScope, $http) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function(e) {
                    e.preventDefault();
                    $http.post('partials/logout')
                        .success(function(data) {
                            $rootScope.user = "";
                        });
                });
            }
        };
    }
}());