'use strict';

/* Directives */
//http://stackoverflow.com/questions/12592472/how-to-highlight-a-current-menu-item
angular.module('swoppr.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  })