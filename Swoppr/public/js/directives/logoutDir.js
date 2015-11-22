/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .directive('logout', ['$http', logoutDir]);

    function logoutDir ($http) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function(e) {
                    e.preventDefault();
                    $http.post('partials/logout');
                });
            }
        };
    }
}());