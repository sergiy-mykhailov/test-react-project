
const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

let nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

module.exports = {
  target: 'node',
  entry: ['babel-polyfill', './src/server/index.js'],
  output: {
    path: path.resolve(__dirname, 'build/'),
    filename: 'server.js',
  },
  externals: nodeModules,
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [/node_modules/, /build/],
      },
    ],
  },
};
