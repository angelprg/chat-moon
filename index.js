const express = require("express");
const http = require("http");
const socket = require("socket.io");
const path = require("path");
const webpack = require("webpack");
const webpackMid = require("webpack-dev-middleware");
const ip = require("ip");

const PORT = process.env.PORT || 3000;
const webpackConfig = require("./webpack.config");

const app = express();
const server = http.createServer(app);
var io = socket(server);
console.log(ip.address());
app.use(webpackMid(webpack(webpackConfig)));
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
  console.log("a user connected");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
