//const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
path = require("path");

module.exports = {
  entry: path.join(__dirname, "src"),
  mode: "development",
  output: {
    path: "/",
    filename: "bundle.js"
  },
  devtool: "source-maps",
  plugins: [
    new MiniCSSExtractPlugin({
      filename: "estilos.css"
    })
  ],
  module: {
    rules: [
      {
        //test: /\.js$/,
        test: /\.jsx?$/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "react"],
          plugins: ["transform-class-properties"]
        }
      },
      {
        test: /\.scss$/,
        loader: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"]
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  }
};
