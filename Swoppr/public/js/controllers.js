'use strict';

/* Controllers */

angular.module('swoppr.controllers', []).
controller('IndexCtrl', function($scope, $http) {
    $http.get('/api/posts').
    success(function(data, status, headers, config) {
        $scope.posts = data.posts;
    });
}).
controller('AddPostCtrl', function($scope, $http, $location) {
    $scope.form = {};
    $scope.submitPost = function() {
        $http.post('/api/post', $scope.form).
        success(function(data) {
            $location.path('/');
        });
    };
}).
controller('ReadPostCtrl', function($scope, $http, $routeParams) {
    $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
        $scope.post = data.post;
    });
}).
controller('EditPostCtrl', function($scope, $http, $routeParams) {
    $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
        $scope.post = data.post;
    });
}).
controller('EditPostCtrl', function($scope, $http, $location, $routeParams) {
    $scope.form = {};
    $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
        $scope.form = data.post;
    });

    $scope.editPost = function() {
        $http.put('/api/post/' + $routeParams.id, $scope.form).
        success(function(data) {
            $location.url('/readPost/' + $routeParams.id);
        });
    };
}).
controller('DeletePostCtrl', function($scope, $http, $location, $routeParams) {
    $http.get('/api/post/' + $routeParams.id).
    success(function(data) {
        $scope.post = data.post;
    });

    $scope.deletePost = function() {
        $http.delete('/api/post/' + $routeParams.id).
        success(function(data) {
            $location.url('/');
        });
    };

    $scope.home = function() {
        $location.url('/');
    };
}).controller('CarouselCtrl', function ($scope) {
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
}).controller('AnimateCtrl', function($scope) {
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
}).controller('NavBarCtrl', function($scope) {
    $scope.isCollapsed = true;
});

function animate($el, animation) {
    $el.removeClass('hide-for-animation');
    $el.addClass('animated ' + animation);
}