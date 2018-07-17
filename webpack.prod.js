/* jshint unused:false, esversion:6*/
/* global require, module, __dirname */

module.exports = {
    mode: "production",
    entry: "./src/marker.extension.ts",
    output: {
      filename: "marker-mover.min.js"
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },
    module: {
      rules: [
        { test: /\.tsx?$/, loader: "ts-loader" }
      ]
    }
  };