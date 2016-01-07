/**
 * Created by jonah on 12/4/2015.
 */

(function () {
    'use strict';
    angular.module('swoppr')
        .controller('PlaceProductCtrl', ['$rootScope', '$scope', '$location', 'ProductService', 'uiGmapGoogleMapApi', PlaceProductCtrl]);

    function PlaceProductCtrl ($rootScope, $scope, $location, ProductService, GoogleMapApi) {
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
                templateurl: '../templates/window.html',
                templateparameter: {}
            },
            map: {
                control: {},
                center: {
                    latitude: 51.052568,
                    longitude: 3.1701058
                },
                zoom: 9,
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
                template: '../templates/searchbox.html',
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
                            $scope.place =  place.formatted_address;
                        }
                    }
                }
            }
        });

        function successAddProduct(response) {
            if (response.data) {
                if (response.data.ok) {
                    $location.path("/detailProduct/" + response.data.ok._id);
                }

                if (response.data.error) {
                    $scope.alerts.push({type: 'danger', msg: response.data.error});
                }
            }
        }

        function errorAddProduct(response) {
            console.log(response);
        }


        $rootScope.$watch("user", function() {
            if ($rootScope.user) {
                $scope.addProduct = function(file) {
                    ProductService.add(file, {
                        userId: $rootScope.user.id,
                        productName: $scope.productName,
                        pricePerDay: $scope.pricePerDay,
                        description: $scope.description,
                        place: $scope.place,
                        longitude: $scope.map.markers[0].longitude,
                        latitude: $scope.map.markers[0].latitude
                    }).then(successAddProduct, errorAddProduct);
                };
            }
        });

        $scope.validate = function(field) {

            if($scope.placeProductForm)

            if (field == 1) {
                if ($scope.placeProductForm.productName.$dirty && $scope.placeProductForm.productName.$invalid) return 'has-error';
                if ($scope.placeProductForm.productName.$dirty && $scope.placeProductForm.productName.$valid) return "has-success";
            } else if (field == 2) {
                if ($scope.placeProductForm.pricePerDay.$dirty && $scope.placeProductForm.pricePerDay.$invalid) return 'has-error';
                if ($scope.placeProductForm.pricePerDay.$dirty && $scope.placeProductForm.pricePerDay.$valid) return "has-success";
            }  else if (field == 3) {
                if ($scope.placeProductForm.description.$dirty && $scope.placeProductForm.description.$invalid) return 'has-error';
                if ($scope.placeProductForm.description.$dirty && $scope.placeProductForm.description.$valid) return "has-success";
            } else if (field == 4) {
                if ($scope.placeProductForm.picture.$dirty && $scope.placeProductForm.picture.$invalid) return 'has-error';
                if ($scope.placeProductForm.picture.$dirty && $scope.placeProductForm.picture.$valid) return "has-success";
            }  else if (field == 5) {
                if ($scope.placeProductForm.place.$valid) return "has-success";
            }
        };
    }
}());