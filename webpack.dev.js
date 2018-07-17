/* jshint unused:false, esversion:6*/
/* global require, module, __dirname */

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode:'development',
  entry: {
    app: './src/index.ts'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './'
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      loader: "ts-loader"
    }]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'])
  ],
  output: {
    filename: 'marker-mover.js'
  }
};