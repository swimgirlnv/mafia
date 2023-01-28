const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

const http = require('http').Server(app);
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);

const socketIO = new require('socket.io')(http, {
    cors: {
        origin: '*' /* react server */
    }
});

let users = [];

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  //Listens when a new user joins the server
  socket.on('newUser', (data) => {
    //Adds the new user to the list of users
    users.push(data);
    // console.log(users);
    //Sends the list of users to the client
    socketIO.emit('newUserResponse', users);
  });

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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/api', (req, res) => {
    res.json({
      message: 'Hello world',
    });
});

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
//   });

// io.on('connection', (socket) => {
// socket.on('chat message', (msg) => {
//     io.emit('chat message', msg);
// });
// });

http.listen(4000, () => {
    console.log(`Server listening on ${4000}`);
});