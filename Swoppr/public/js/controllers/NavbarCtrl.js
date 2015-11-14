/**
 * Created by jonah on 11/14/2015.
 */
(function () {
    'use strict';

    angular.module('swoppr')
        .controller('NavbarCtrl', NavbarCtrl);

    function NavbarCtrl($scope, $location) {
        //https://jsfiddle.net/xv7tws10/5/
        $scope.isCollapsed = true;

        //http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item
        $scope.getClass = function (path) {
            if ($location.path() === path) {
                return 'active';
            } else {
                return '';
            }
        };
    }
}());