/**
 * Created by jonah on 12/23/2015.
 */

(function () {
    'use strict';
    angular.module('swoppr')
        .controller('DetailRentingCtrl', ['$rootScope', '$scope', '$routeParams', 'RentingService', 'ChatService', DetailRentingCtrl]);

    function DetailRentingCtrl($rootScope, $scope, $routeParams, RentingService, ChatService) {

        $scope.renting = [];
        $scope.messages = [];

        //renting ophalen
        var onGetRentingSuccesfull = function(renting) {
            if ($rootScope.user.id == renting.renterFrom.id) {
                $scope.whoRents = 'renterFrom';
                $scope.renting = renting;
            } else if ($rootScope.user.id == renting.renterTo.id) {
                $scope.whoRents = 'renterTo';
                $scope.renting = renting;
            } else {
                $scope.whoRents = 'noAccess';
            }

            $scope.renting = renting;
        };

        //messages ophalen
        var onGetRentingError = function(err) {
            console.log("error getting renting");
        };

        var rentingId = $routeParams.id;
        RentingService.byId(rentingId).then(onGetRentingSuccesfull, onGetRentingError);

        var onGetMessagesSuccesfull = function(messages) {
            $scope.messages = messages;
        };

        var onGetMessagesError = function(messages) {
            console.log("error getting message");
        };

        ChatService.getMessages(rentingId).then(onGetMessagesSuccesfull, onGetMessagesError);
        
        var socket = io.connect();

        socket.emit("join renting", rentingId);
        socket.on("broadcast message", function(message) {
            $scope.messages.push(message);
            $scope.$apply();
        });

        //message toeovegen
        $scope.addMessage = function() {
            var newMessage = new Message(
                rentingId,
                $scope.user.id,
                $scope.user.toString(),
                $scope.content
            );

            var onAddMessageSuccessfull = function(renting) {
                $scope.messages.push(renting);
                socket.emit("newMessage", {rentid: rentingId, message: renting});
            };

            var onAddMessageError = function(err) {
                console.log("error adding message");
            };

            ChatService.addMessage(newMessage, rentingId).then(onAddMessageSuccessfull, onAddMessageError);
        };

        $scope.validate = function(field) {
            if (field == 1) {
                if ($scope.chat.content.$dirty && $scope.chat.content.$invalid) return 'has-error';
                if ($scope.chat.content.$dirty && $scope.chat.content.$valid) return "has-success";
            }
        };
    }
}());