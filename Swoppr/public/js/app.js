(function () {
    'use strict';
    angular.module('swoppr', [
        'ngRoute',
        'ngMessages',
        'ngAnimate',
        'angular-scroll-animate',
        'ui.bootstrap',
        'httpFactory',
        'ngFileUpload',
        'uiGmapgoogle-maps'
    ])
    .
    config(['uiGmapGoogleMapApiProvider', '$routeProvider', '$locationProvider', function (GoogleMapApi, $routeProvider, $locationProvider) {
        $routeProvider.
        when('/', {
            templateUrl: 'partials/index',
            controller: 'IndexCtrl'
        }).
        when('/toRent', {
            templateUrl: 'partials/toRent',
            controller: '',
            auth: true
        }).
        when('/chat/:id?', {
            templateUrl: 'partials/chat',
            controller: 'ChatioCtrl'
        }).
        when('/ServiceTester', {
            templateUrl: 'partials/ServiceTester',
            controller: "ServiceTesterCtrl"
        }).
        when('/placeArticle', {
            templateUrl: 'partials/placeArticle',
            controller: 'PlaceArticleCtrl',
            auth: true
        }).
        when('/myArticles', {
            templateUrl: 'partials/myArticles',
            controller: ''
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

        GoogleMapApi.configure({
            key: 'AIzaSyBpqFRZqco4RCdLgKum7ZNF5eNqLiyB9cc',
            v: '3.17',
            libraries: 'places'
        });
    }])
    .
    run(['$templateCache', '$rootScope', '$location', '$http', '$route', function($templateCache, $rootScope, $location, $http, $route) {
        $rootScope.$on( "$routeChangeStart", function(next) {

            //userdata ophalen voor navbar

            if (!$rootScope.user) {
                $http.get('/api/user/userDataNavbar/' + new Date().getTime())
                    .success(function(data) {
                        $rootScope.user = data;
                    });
            }

            var nextPath = $location.path();
            var nextRoute = $route.routes[nextPath];

            if (nextRoute) {
                //als pagina geauthorizeerd moet zijn en er geen user ingelogd is --> naar loginpagina
                if (nextRoute.auth && $rootScope.user == "error") {
                    $location.path("/login");
                }
            }
        });

        $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Search">');
        $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
    }]);
}());