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

// Al ingresar se muestra mensaje de bienvenida al usuario y aviso al resto
io.on("connection", socket => {
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

  // Envío de mensajes entre usuarios
  socket.on("userMessage", (msg, callback) => {
    const user = users.getUser(socket.id);
    io.emit("message", {
      from: user.username,
      text: msg,
      timestamp: new Date().toLocaleTimeString().slice(0, -3)
    });
    callback();
  });

  // Al salir también se envía notificación al resto de los usuarios.
  socket.on("leave", () => {
    const user = users.getUser(socket.id);
    if (user) {
      io.emit("message", {
        from: "Admin",
        text: `${user.username} abandonó el chat`,
        timestamp: new Date().toLocaleTimeString().slice(0, -3)
      });
      users.removeUser(socket.id);
    }
  });
});

// Se inicia Servidor
server.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});
