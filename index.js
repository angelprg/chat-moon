const express = require("express");
const path = require("path");
const webpack = require("webpack");
const webpackMid = require("webpack-dev-middleware");
const ip = require("ip");

const PORT = process.env.PORT || 3000;
const webpackConfig = require("./webpack.config");

const app = express();
app.use(webpackMid(webpack(webpackConfig)));
//console.log(ip.address());

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));