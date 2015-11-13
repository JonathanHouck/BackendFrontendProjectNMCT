/**
 * Created by jonah on 11/7/2015.
 */

'use strict';

angular.module('swoppr').controller('CarouselCtrl', function ($scope) {
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
 });
