'use strict';

/* Directives */

angular.module('swoppr.directives', []).
  directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  });
