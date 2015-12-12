/**
 * Created by jonah on 11/14/2015.
 */
(function () {
    'use strict';

    angular.module('swoppr')
        .controller('CarouselCtrl', CarouselCtrl);

    function CarouselCtrl($scope) {
        //$scope.myInterval = 5000;
        $scope.noWrapSlides = true;
        var slides = $scope.slides = [];

        slides.push({
            image: 'images/geldVerdienen.png',
            text: 'Gebruik je enkel in het weekend uw grasmaaier? Verdien nu in de weekdagen geld ermee!'
        });

        slides.push({
            image: 'images/kruiwagen.png',
            text: 'Enkel bij het verhuizen een kruiwagen nodig? Huur nu een kruiwagen voor deze periode!'
        });
    }
}());

