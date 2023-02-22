const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

const onlineUsers = {};
let onlineCount = 0;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("user joined", (username) => {
    console.log(`user ${username} joined the chat`);
    if (!onlineUsers[username]) {
      onlineCount++;
      onlineUsers[username] = socket.id;
      io.emit("user joined", username, onlineCount);
    } else {
      socket.emit("username exists");
    }
  });

  socket.on("chat message", (message) => {
    console.log(`message: ${message}`);
    const username = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );
    io.emit("chat message", { username, message });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
    const username = Object.keys(onlineUsers).find(
      (key) => onlineUsers[key] === socket.id
    );
    if (onlineUsers[username]) {
      onlineCount--;
      io.emit("user left", username, onlineCount);
      delete onlineUsers[username];
    }
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
