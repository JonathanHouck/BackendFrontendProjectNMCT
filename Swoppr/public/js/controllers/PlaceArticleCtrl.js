/**
 * Created by Greg on 04-Dec-15.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('PlaceArticleCtrl', ['$scope', 'ProductService', 'RentingService', 'UserService', PlaceArticleCtrl]);

    function PlaceArticleCtrl ($scope, ProductService, RentingService, UserService) {
        var productId = "5661cae440d7dfb819343c88";
        var productId2 = "5661da9afd0fbe340fcf50fe";
        var productToDeleteId = "5661e0a474c36f0c277234cb";
        var idUser = "565df548facad7f403384e3b";
        var idUser2 = "5661b52d37012fe41ebdaa05";
        var rentingId = "5661ec44fa9bebbc01a39e73";

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
        $scope.RentingsById = RentingService.byId(rentingId);
        $scope.RentingsByUser = RentingService.byUser(idUser);
        $scope.RentingsByRenter = RentingService.byRenter(idUser2);
        $scope.RentingsByProduct = RentingService.byProduct(productId);


        //var r = new Renting(idUser, idUser2, productId, 1);
        //RentingService.add(r);
        //var r2 = new Renting(idUser2, idUser, productId2, 1);
        //RentingService.add(r2);

    }
}());