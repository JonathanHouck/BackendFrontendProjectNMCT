/**
 * Created by jonah on 12/18/2015.
 */
(function() {
    "use strict";

    angular.module("swoppr")
        .directive("productforrent", productDir);

    function productDir() {
        return {
            restrict: 'E',
            templateUrl: '../templates/product.html'
        };
    }
})();