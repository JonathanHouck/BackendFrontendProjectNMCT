'use strict';

var app = angular.module('swoppr', [
  'angular-scroll-animate',
  'ngAnimate',
  'ui.bootstrap'
]);

angular.module('swoppr').controller('NavBarCtrl', function($scope) {
  $scope.isCollapsed = true;
});