path = require("path");
module.exports = {
  entry: path.join(__dirname, "src"),
  mode: "development",
  output: {
    path: "/",
    filename: "bundle.js"
  },
  devtool: "source-maps",
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        query: {
          // presets are colection of plugins
          presets: ["es2015", "react"],
          plugins: ["transform-class-properties"]
        }
      }
    ]
  }
};
