/**
 * Created by jonah on 12/24/2015.
 */
    "use strict";

    var MessageService = (function($http) {

        var getMessages = function(rentingId) {
            var url = '/api/chat/' + rentingId;
            return $http.get(url).then(function(response) {
                if (response.data.error) {
                    return "error";
                }

                var messages = [];
                angular.forEach(response.data.ok, function(m) {
                    var msg = new Message(
                        m._renting,
                        m._sender,
                        m.name,
                        m.content,
                        m.createdOn
                    );
                    messages.push(msg);
                });

                return messages;
            });
        };

        var addMessage = function(message, rentingId) {
            var url = '/api/chat/' + rentingId;
            return $http.post(url, message).then(function(response) {
                if (response.data.error) {
                    return "error";
                }

                var m = response.data.ok;
                var msg = new Message(
                    m._renting,
                    m._sender,
                    m.name,
                    m.content,
                    m.createdOn
                );

                return msg;
            });
        };

        return {
            getMessages: getMessages,
            addMessage : addMessage
        };
    })();
    angular.module("swoppr").factory("ChatService", ["$http", MessageService]);