var webpackMerge = require('webpack-merge');
var clientConfig = require('./webpack.client.dev.js');
var serverConfig = require('./webpack.server.dev.js');

module.exports = [
  // Client
  clientConfig,

  // Server
  serverConfig
];
