/**
 * Created by jonah on 12/12/2015.
 */

(function () {
    'use strict';
    angular.module('swoppr')
        .controller('WindowCtrl', ['$scope', WindowCtrl]);

    function WindowCtrl($scope) {
        $scope.place = {};
        $scope.showPlaceDetails = function(param) {
            $scope.place = param;
        };
    }
}());