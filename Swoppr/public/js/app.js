'use strict';

// Declare app level module which depends on filters, and services

angular.module('swoppr', [
    'ngRoute',
    'ngAnimate',
    'angular-scroll-animate',
    'ui.bootstrap',
    'swoppr.controllers',
    'swoppr.filters',
    'swoppr.services',
    'swoppr.directives'
]).
config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider.
      when('/', {
        templateUrl: 'partials/index',
        controller: 'AnimateCtrl'
      }).
      when('/toRent', {
          templateUrl: 'partials/toRent',
          controller: 'IndexCtrl'
      }).
        when('/placeArticle', {
          templateUrl: 'partials/placeArticle',
          controller: 'IndexCtrl'
        }).
      when('/addPost', {
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
      }).
      otherwise({
        redirectTo: '/'
      });
  $locationProvider.html5Mode(true);
}]);