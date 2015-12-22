/**
 * Created by jonah on 12/4/2015.
 */

(function () {
    'use strict';
    angular.module('swoppr')
        .controller('PlaceArticleCtrl', ['$rootScope', '$scope', '$http', 'Upload', 'uiGmapGoogleMapApi', PlaceArticleCtrl])
        .run(['$templateCache', function($templateCache) {
            $templateCache.put('searchbox.tpl.html', '<input id="pac-input" class="pac-controls" type="text" placeholder="Adres zoeken">');
            $templateCache.put('window.tpl.html', '<div ng-controller="WindowCtrl" ng-init="showPlaceDetails(parameter)">{{place.name}}</div>');
        }]);

    function PlaceArticleCtrl ($rootScope, $scope, $http, Upload, GoogleMapApi) {

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        GoogleMapApi.then(function(maps) {
            maps.visualRefresh = true;
            $scope.defaultBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(50.8252383, 3.24815210));


            $scope.map.bounds = {
                northeast: {
                    latitude:$scope.defaultBounds.getNorthEast().lat(),
                    longitude:$scope.defaultBounds.getNorthEast().lng()
                },
                southwest: {
                    latitude:$scope.defaultBounds.getSouthWest().lat(),
                    longitude:-$scope.defaultBounds.getSouthWest().lng()

                }
            };
            $scope.searchbox.options.bounds = new google.maps.LatLngBounds($scope.defaultBounds.getNorthEast(), $scope.defaultBounds.getSouthWest());
        });

        angular.extend($scope, {
            selected: {
                options: {
                    visible:false

                },
                templateurl:'window.tpl.html',
                templateparameter: {}
            },
            map: {
                control: {},
                center: {
                    latitude: 50.8252383,
                    longitude: 3.24815210
                },
                zoom: 12,
                dragging: false,
                bounds: {},
                markers: [],
                idkey: 'place_id',
                events: {
                    idle: function (map) {

                    },
                    dragend: function(map) {
                        //update the search box bounds after dragging the map
                        var bounds = map.getBounds();
                        var ne = bounds.getNorthEast();
                        var sw = bounds.getSouthWest();
                        $scope.searchbox.options.bounds = new google.maps.LatLngBounds(sw, ne);
                        //$scope.searchbox.options.visible = true;
                    }
                }
            },
            searchbox: {
                template:'searchbox.tpl.html',
                options: {
                    autocomplete:true,
                    types: ['geocode'],
                    componentRestrictions: {country: 'be'}
                },
                events: {
                    place_changed: function (autocomplete){

                        var place = autocomplete.getPlace();

                        if (place.address_components) {

                            var newMarkers = [];
                            var bounds = new google.maps.LatLngBounds();

                            var marker = {
                                id:place.place_id,
                                place_id: place.place_id,
                                name: place.address_components[0].long_name,
                                latitude: place.geometry.location.lat(),
                                longitude: place.geometry.location.lng(),
                                options: {
                                    visible:false
                                },
                                templateurl:'window.tpl.html',
                                templateparameter: place
                            };

                            newMarkers.push(marker);

                            bounds.extend(place.geometry.location);

                            $scope.map.bounds = {
                                northeast: {
                                    latitude: bounds.getNorthEast().lat(),
                                    longitude: bounds.getNorthEast().lng()
                                },
                                southwest: {
                                    latitude: bounds.getSouthWest().lat(),
                                    longitude: bounds.getSouthWest().lng()
                                }
                            };

                            angular.forEach(newMarkers, function(marker) {
                                //_.each(newMarkers, function(marker) {
                                marker.closeClick = function() {
                                    $scope.selected.options.visible = false;
                                    marker.options.visble = false;

                                    console.log(marker);
                                };
                                marker.onClicked = function() {
                                    $scope.selected.options.visible = false;
                                    $scope.selected = marker;
                                    $scope.selected.options.visible = true;
                                };
                            });

                            $scope.map.markers = newMarkers;

                            $scope.location =  place.formatted_address;
                            console.log(place);
                        } else {
                            console.log("do something else with the search string: " + place.name);
                        }
                    }
                }
            }
        });

        $scope.uploadFile = function(file) {
            if (file) {
                file.upload = Upload.upload({
                    url: '/api/product/newProduct',
                    file: file,
                    data: {
                        userId: $rootScope.user._id,
                        productName: $scope.productName,
                        pricePerDay: $scope.pricePerDay,
                        description: $scope.description
                    }
                }).then(function(resp) {
                    if (resp.data.ok) {
                        $rootScope.user.products.push(resp.data.ok);
                    }
                });
            } else {
                $http
                    .post('/api/product/newProduct', {
                        userId: $rootScope.user._id,
                        productName: $scope.productName,
                        pricePerDay: $scope.pricePerDay,
                        description: $scope.description
                    }).then(successCallback, errorCallback);
            }

            function successCallback(resp) {
                if (resp.data) {
                    if (resp.data.ok) {
                        $rootScope.user.products.push(resp.data.ok);
                    }

                    if (resp.data.error) {
                        $scope.alerts.push({type: 'danger', msg: resp.data.error});
                    }
                }
            }

            function errorCallback(response) {
                console.log(response);
            }
        };

        $scope.validate = function(field) {
            if (field == 1) {
                if ($scope.placeArticleForm.productName.$dirty && $scope.placeArticleForm.productName.$invalid) return 'has-error';
                if ($scope.placeArticleForm.productName.$dirty && $scope.placeArticleForm.productName.$valid) return "has-success";
            } else if (field == 2) {
                if ($scope.placeArticleForm.pricePerDay.$dirty && $scope.placeArticleForm.pricePerDay.$invalid) return 'has-error';
                if ($scope.placeArticleForm.pricePerDay.$dirty && $scope.placeArticleForm.pricePerDay.$valid) return "has-success";
            }  else if (field == 3) {
                if ($scope.placeArticleForm.description.$dirty && $scope.placeArticleForm.description.$invalid) return 'has-error';
                if ($scope.placeArticleForm.description.$dirty && $scope.placeArticleForm.description.$valid) return "has-success";
            } else if (field == 4) {
                if ($scope.placeArticleForm.picture.$dirty && $scope.placeArticleForm.picture.$invalid) return 'has-error';
                if ($scope.placeArticleForm.picture.$dirty && $scope.placeArticleForm.picture.$valid) return "has-success";
            }  else if (field == 5) {
                if ($scope.placeArticleForm.location.$valid) return "has-success";
            }
        };
    }
}());