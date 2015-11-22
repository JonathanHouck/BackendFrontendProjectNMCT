/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .directive('redirDir', redirDir);

    function redirDir() {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.on('click', function(e) {
                    e.preventDefault();
                    window.location = attrs.href;
                });
            }
        };
    }
}());