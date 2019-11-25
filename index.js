const express = require("express");
const http = require("http");
const socket = require("socket.io");
const path = require("path");
const webpack = require("webpack");
const webpackMid = require("webpack-dev-middleware");
const ip = require("ip");
const users = require("./users");

// Configuración
const PORT = process.env.PORT || 3000;
const webpackConfig = require("./webpack.config");

// Servidor
const app = express();
const server = http.createServer(app);
var io = socket(server);

app.set("port", PORT);

// Webpack Middleware (Para servir front end)
app.use(express.static(path.join(__dirname, "public")));
app.use(webpackMid(webpack(webpackConfig)));

// Sockets
io.on("connection", socket => {
  console.log("socket connected", socket.id);

  socket.on("join", (username, callback) => {
    const res = users.addUser(socket.id, username);
    if (res.error) callback(res.error);
    const timestamp = new Date().toLocaleTimeString().slice(0, -3);

    socket.emit("message", {
      from: "Admin",
      text: `Bienvenido al chat ${res.username}`,
      timestamp,
      type: "admin"
    });

    socket.broadcast.emit("message", {
      from: "Admin",
      text: `${res.username} se unió al chat`,
      timestamp,
      type: "admin"
    });

    callback();
  });

  socket.on("userMessage", (msg, callback) => {
    const user = users.getUser(socket.id);
    console.log("userMessage");
    console.log(user);
    io.emit("message", {
      from: user.username,
      text: msg,
      timestamp: new Date().toLocaleTimeString().slice(0, -3)
    });
    callback();
  });

  socket.on("leave", () => {
    users.removeUser(socket.id);
  });
  socket.on("disconnect", () => {
    console.log("User left");
  });
});

// Se inicia Servidor
server.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
