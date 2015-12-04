/**
 * Created by Greg on 04-Dec-15.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('PlaceArticleCtrl', ['$scope', 'ProductService', 'RentingService', 'UserService', PlaceArticleCtrl])

    function PlaceArticleCtrl ($scope, ProductService, RentingService, UserService) {
        var productId = "5661cae440d7dfb819343c88";
        var productToDeleteId = "5661e0a474c36f0c277234cb";
        var idUser = "5661b52d37012fe41ebdaa05";
        var rentingId = "";

        //Products
        $scope.ProductsAll = ProductService.all();
        $scope.ProductsById = ProductService.byId(productId);
        $scope.ProductsByIdUser = ProductService.byIdUser(productId);
        //var newProduct = new Product("test", 5, "description", Date.now());
        //ProductService.add(userId, newProduct);
        //ProductService.remove(productToDeleteId);


        //Users
        $scope.UsersAll = UserService.all();
        $scope.UserById = UserService.byId(idUser);
        $scope.UsersAllWithProducts = UserService.AllWithProducts();

        //add niet nodig?
        //var u = new User("Den Boss", "Jos","josdenboss@hotmail.com", null, Date.now());
        //UserService.add(u);




        //Rentings

    }
}());