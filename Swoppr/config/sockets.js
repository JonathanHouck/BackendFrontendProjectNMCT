module.exports = function (io) {
    'use strict';
    io.sockets.on("connection", function (socket) {
        socket.on("join renting", function (rentid) {
            socket.join(rentid);
        });

        socket.on("newMessage", function (data) {
            socket.broadcast.to(data.rentid).emit("broadcast message", data.message);
        });
    });
};