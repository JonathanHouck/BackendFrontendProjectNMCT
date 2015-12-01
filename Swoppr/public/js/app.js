(function () {
    'use strict';
    angular.module('swoppr', [
        'ngRoute',
        'ngMessages',
        'ngAnimate',
        'angular-scroll-animate',
        'ui.bootstrap',
        'httpFactory',
        'angular-growl'
    ])
    .
    config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/index',
            controller: 'IndexCtrl'
        }).
        when('/toRent', {
            templateUrl: 'partials/toRent',
            controller: 'RegisterCtrl',
            auth: true
        }).
        when('/placeArticle', {
            templateUrl: 'partials/placeArticle',
            controller: 'RegisterCtrl'
        }).
        when('/logout', {
            templateUrl: 'partials/logout',
            controller: 'RegisterCtrl'
        }).
        when('/login', {
            templateUrl: 'partials/login',
            controller: 'LoginCtrl'
        }).
        when('/register', {
            templateUrl: 'partials/register',
            controller: 'RegisterCtrl'
        }).
        when('/profile', {
            templateUrl: '/partials/profile',
            controller: 'ProfileCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
        $locationProvider.html5Mode(true);
    }])
    .
    run(function($rootScope, $location, $http, $route) {
        $rootScope.$on( "$routeChangeStart", function(next) {

            //userdata ophalen voor navbar
            $http.get('/api/user/userDataNavbar')
                .success(function(data) {
                    $rootScope.user = data;
            });

            var nextPath = $location.path();
            var nextRoute = $route.routes[nextPath];

            if (nextRoute) {
                //als pagina geauthorizeerd moet zijn en er geen user ingelogd is --> naar loginpagina
                if (nextRoute.auth && $rootScope.user == "error") {
                    $location.path("/login");
                }
            }
        });
    });
}());