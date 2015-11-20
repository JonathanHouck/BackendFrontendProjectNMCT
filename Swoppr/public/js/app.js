(function () {
    'use strict';
    angular.module('swoppr', [
        'ngRoute',
        'ngAnimate',
        'angular-scroll-animate',
        'ui.bootstrap'
    ]).
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/index',
            controller: 'IndexCtrl'
        }).
        when('/toRent', {
            templateUrl: 'partials/toRent',
            controller: 'IndexCtrl'
        }).
        when('/placeArticle', {
            templateUrl: 'partials/placeArticle',
            controller: 'IndexCtrl'
        }).
        when('/login', {
            templateUrl: 'partials/login',
            controller: 'IndexCtrl'
        }).
        when('/register', {
            templateUrl: 'partials/register',
            controller: 'IndexCtrl'
        }).
        /*when('/addPost', {
            templateUrl: 'partials/addPost',
            controller: 'AddPostCtrl'
        }).
        when('/readPost/:id', {
            templateUrl: 'partials/readPost',
            controller: 'ReadPostCtrl'
        }).
        when('/editPost/:id', {
            templateUrl: 'partials/editPost',
            controller: 'EditPostCtrl'
        }).
        when('/deletePost/:id', {
            templateUrl: 'partials/deletePost',
            controller: 'DeletePostCtrl'
        }).*/
        otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
    }]);
}());