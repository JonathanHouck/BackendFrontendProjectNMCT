/**
 * Created by jonah on 12/18/2015.
 */
(function() {
    "use strict";

    //we maken een applicatie aan en steken die in app zelf
    angular.module("swoppr")
        .directive("productforrent", productDir)
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('product.tpl.html', "<a href='/rentProduct/{{p.id}}'><div class='thumbnail'><div><div class='mask2'><p>Beschrijving:</p><p>{{p.shortDescription()}}</p></div><img ng-show='p.url' src='{{p.url}}' /><img ng-hide='p.url' src='images/noImageFound.png' /></div><p class='smallFont'>{{p.shortProductName()}}</p><p class='smallFontBigger price'> &euro; {{p.pricePerDay}} / dag</p></div></a>");
        }]);

    function productDir() {
        return {
            restrict: 'E',
            templateUrl: 'product.tpl.html'
        };
    }
})();