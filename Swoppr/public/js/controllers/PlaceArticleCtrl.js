/**
 * Created by Greg on 04-Dec-15.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('PlaceArticleCtrl', ['$scope', 'ProductService', PlaceArticleCtrl])

    function PlaceArticleCtrl ($scope, ProductService) {
        var productId = "5661cae440d7dfb819343c88";
        var productToDeleteId = "5661e0a474c36f0c277234cb";


        var userId = "5661b52d37012fe41ebdaa05";
        $scope.all = ProductService.all();
        $scope.byId = ProductService.byId(productId);
        $scope.byIdUser = ProductService.byIdUser(productId);

        //var newProduct = new Product("test", 5, "description", Date.now());
        //ProductService.add(userId, newProduct);

        //ProductService.remove(productToDeleteId);

    }
}());