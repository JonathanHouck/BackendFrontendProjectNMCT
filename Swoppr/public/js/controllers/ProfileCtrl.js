/**
 * Created by jonah on 11/21/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('ProfileCtrl', ['$scope', '$http', ProfileCtrl]);

    function ProfileCtrl ($scope, $http) {
        $http.get('/api/user/userData')
            .success(function(data) {
                $scope.user = data; //Expose the user data to your angular scope
        });
    }
}());