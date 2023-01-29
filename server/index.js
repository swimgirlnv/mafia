const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

let users = [];

socketIO.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data); // change what data...
        users.push(data);
        socketIO.emit('newUserResponse', users);
        // socketIO.emit('messageResponse', data);
    });

    // socket.on("send_message", (data) => {
    //     socket.to(data.room).emit("receive_message", data);
    // });

    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
        //Updates the list of users when a user disconnects from the server
        users = users.filter((user) => user.socketID !== socket.id);
        // console.log(users);
        //Sends the list of users to the client
        socketIO.emit('newUserResponse', users);
        socket.disconnect();
    });
});

server.listen(3001, () => {
    console.log("Server is running on port 3001");
});