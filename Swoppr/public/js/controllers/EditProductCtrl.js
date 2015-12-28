/**
 * Created by jonah on 12/27/2015.
 */
(function () {
    'use strict';

    angular.module('swoppr')
        .controller('EditProductCtrl', ['$scope', '$routeParams', '$location', 'ProductService', 'uiGmapGoogleMapApi', EditProductCtrl]);

    function EditProductCtrl($scope, $routeParams, $location, ProductService, GoogleMapApi) {

        $scope.alerts = [];

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };

        $scope.user = [];

        var onGetUserWithProductSuccesfull = function(user) {
            $scope.user = user;
        };

        var onGetUserWithProductError = function(err) {
            console.log(err);
        };

        var productId = $routeParams.id;
        ProductService.byIdUser(productId).then(onGetUserWithProductSuccesfull, onGetUserWithProductError);

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

                            $scope.user.product.longitude = newMarkers[0].longitude;
                            $scope.user.product.latitude = newMarkers[0].latitude;
                            $scope.user.product.place =  place.formatted_address;
                        }
                    }
                }
            }
        });

        function successEditProduct(response) {
            if (response.data) {
                if (response.data.ok) {
                    $location.path("/detailProduct/" + response.data.ok);
                }

                if (response.data.error) {
                    $scope.alerts.push({type: 'danger', msg: response.data.error});
                }
            }
        }

        function errorEditProduct(response) {
            console.log(response);
        }

        $scope.editProduct = function(file) {
            ProductService.edit(file, {
                productId: $scope.user.product.id,
                productName: $scope.user.product.productName,
                pricePerDay: $scope.user.product.pricePerDay,
                description: $scope.user.product.description,
                url: $scope.user.product.url,
                publicid: $scope.user.product.publicid,
                place: $scope.user.product.place,
                longitude: $scope.user.product.longitude,
                latitude: $scope.user.product.latitude
            }).then(successEditProduct, errorEditProduct);
        };

        $scope.validate = function(field) {
            if($scope.editProductForm)
                if (field == 1) {
                    if ($scope.editProductForm.productName.$dirty && $scope.editProductForm.productName.$invalid) return 'has-error';
                    if ($scope.editProductForm.productName.$dirty && $scope.editProductForm.productName.$valid) return "has-success";
                } else if (field == 2) {
                    if ($scope.editProductForm.pricePerDay.$dirty && $scope.editProductForm.pricePerDay.$invalid) return 'has-error';
                    if ($scope.editProductForm.pricePerDay.$dirty && $scope.editProductForm.pricePerDay.$valid) return "has-success";
                }  else if (field == 3) {
                    if ($scope.editProductForm.description.$dirty && $scope.editProductForm.description.$invalid) return 'has-error';
                    if ($scope.editProductForm.description.$dirty && $scope.editProductForm.description.$valid) return "has-success";
                } else if (field == 4) {
                    if ($scope.editProductForm.picture.$dirty && $scope.editProductForm.picture.$invalid) return 'has-error';
                    if ($scope.editProductForm.picture.$dirty && $scope.editProductForm.picture.$valid) return "has-success";
                }  else if (field == 5) {
                    if ($scope.editProductForm.location.$valid) return "has-success";
                }
        };
    }
}());