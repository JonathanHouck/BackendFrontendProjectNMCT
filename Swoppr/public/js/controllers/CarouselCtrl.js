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
            text: 'Iets nodig maar wil je niet teveel geld uitgeven?'
        });

        slides.push({
            image: 'images/ongebruikteGoederen.png',
            text: "Veel geld uitgegeven maar gebruikt het zelden?"
        });
    }
}());

