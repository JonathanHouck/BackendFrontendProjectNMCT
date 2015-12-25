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
            controller: 'ToRentCtrl',
            auth: true
        }).
        when('/rentProduct/:id?', {
            templateUrl: 'partials/rentProduct',
            controller: 'RentProductCtrl',
            auth: true
        }).
        when('/detailProduct/:id?', {
            templateUrl: 'partials/detailProduct',
            controller: 'DetailProductCtrl',
            auth: true
        }).
        when('/detailRenting/:id?', {
            templateUrl: 'partials/detailRenting',
            controller: 'DetailRentingCtrl',
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
        when('/placeProduct', {
            templateUrl: 'partials/placeProduct',
            controller: 'PlaceProductCtrl',
            auth: true
        }).
        when('/myProducts', {
            templateUrl: 'partials/myProducts',
            controller: ''
        }).
        when('/myRentings', {
            templateUrl: 'partials/myRentings',
            controller: 'myRentingsCtrl'
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
            templateUrl: 'partials/profile',
            controller: 'ProfileCtrl',
            auth: true
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
    run(['$rootScope', '$location', '$http', '$route', 'UserService', function($rootScope, $location, $http, $route, UserService) {
        $rootScope.$on( "$routeChangeStart", function(next) {
            function succesUserData(data) {
                if (data) {
                    if (data.error) {
                        $rootScope.user = "";
                    } else {
                        $rootScope.user = data;
                    }
                }
            }

            function errorUserData(response) {
                console.log(response);
            }

            if (!$rootScope.user) {
                UserService.userData().then(succesUserData, errorUserData);
            }

            var nextPath = $location.path();
            var nextRoute = $route.routes[nextPath];

            if (nextRoute) {
                //als pagina geauthorizeerd moet zijn en er geen user ingelogd is --> naar loginpagina
                if (nextRoute.auth && ($rootScope.user == "error")) {
                    $location.path("/login");
                }
            }
        });
    }]);
}());