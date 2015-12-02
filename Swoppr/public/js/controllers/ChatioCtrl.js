/**
 * Created by jonah on 12/1/2015.
 */
(function () {
    'use strict';
    angular.module('swoppr')
        .controller('ChatioCtrl', ['$rootScope', '$scope', '$http', '$routeParams', ChatioCtrl]);

    function ChatioCtrl($rootScope, $scope, $http, $routeParams) {
        $scope.rentid = $routeParams.id;

        $scope.messages = [];

        var name = $rootScope.user.firstname + $rootScope.user.surname;
        $scope.newMessage = createBlankMessage(name);

        //alle messages ophalen van het id in de url
        $http.get("/api/chat/" + $scope.rentid).then(function (result) {
            $scope.messages = result.data;
        }, function(err) {
            alert(err);
        });

        var socket = io.connect();

        socket.emit("join renting", $scope.rentid);

        socket.on("broadcast message", function(message) {
            $scope.messages.push(message);
            $scope.$apply();
        });

        //message saven aan de bijhorende renting
        $scope.save = function() {
            $http.post('/api/chat/' + $scope.rentid, $scope.newMessage).then(function(result) {
                $scope.messages.push(result.data);
                $scope.newNote = createBlankMessage();
                socket.emit("newMessage", {rentid: $scope.rentid, message: result.data});
            }, function(err) {
                alert(err);
            });
        };
    }
}());

function createBlankMessage(name) {
    return {
        content: "",
        name: name
    };
}