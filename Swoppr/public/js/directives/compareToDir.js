/**
 * Created by jonah on 11/28/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .directive('compareTo', compareToDir);

    function compareToDir () {
        return {
            require: "ngModel",
            scope: {
                otherModelValue: "=compareTo"
            },
            link: function(scope, element, attributes, ngModel) {

                ngModel.$validators.compareTo = function(modelValue) {
                    return modelValue == scope.otherModelValue;
                };
                scope.$watch("otherModelValue", function() {
                    ngModel.$validate();
                });
            }
        };
    }
}());