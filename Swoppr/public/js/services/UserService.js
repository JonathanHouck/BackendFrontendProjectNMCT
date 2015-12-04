/**
 * Created by Greg on 24-Nov-15.
 */

(function(){
    "use strict";

    var UserService = function($http){

        var byId = function(id){
            var url =   '/api/user/getById/'+id;
            return $http.get(url)
                .then(function(response) {
                    var u = response.data;
                    return new User(
                        u.lastname,
                        u.firstname,
                        u.local.email,
                        u.products,
                        u.createdOn
                    );
                });
        };

        var AllWithProducts = function(){
            var url = '/api/user/getAllUsersWithProducts';
            return $http.get(url)
                .then(function(response) {
                    var users = [];
                    angular.forEach(response.data, function(u){
                        var user = new User(
                            u.lastname,
                            u.firstname,
                            u.local.email,
                            u.products,
                            u.createdOn
                        );
                        users.push(user);
                    });
                    return users;
                });
        };

        var all = function(){
            var url =   '/api/user/getAll/';
            return $http.get(url)
                .then(function(response) {
                    var users = [];
                    angular.forEach(response.data, function(u){
                        var user = new User(
                            u.lastname,
                            u.firstname,
                            u.local.email,
                            u.products,
                            u.createdOn
                        );
                        users.push(user);
                    });
                    return users;
                });
        };

        var add = function(user){
            var url =   '/api/user/newUser/';
            $http.post(url, user)
                .then(function(response) {
                    return response; //Expose the user data to your angular scope
                });
        };


        return {
            byId : byId,
            AllWithProducts : AllWithProducts,
            add : add,
            all : all
        };
    };
    angular.module("swoppr").factory("UserService", ["$http", UserService]);
})();