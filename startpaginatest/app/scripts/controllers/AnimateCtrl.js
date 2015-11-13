/**
 * Created by jonah on 11/11/2015.
 */

angular.module('swoppr').controller('AnimateCtrl', function($scope) {
    $scope.fadeIn = function($el) {
        animate($el, "fadeIn");
    };

    $scope.fadeInUp = function($el) {
        animate($el, "fadeInUp");
    };

    $scope.fadeInLeft = function($el) {
        animate($el, "fadeInLeft");
    };

    $scope.fadeInRight = function($el) {
        animate($el, "fadeInRight");
    };

    $scope.zoomIn = function($el) {
        animate($el, "zoomIn");
    };
});

function animate($el, animation) {
    $el.removeClass('hide-for-animation');
    $el.addClass('animated ' + animation);
}