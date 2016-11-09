var webpackMerge = require('webpack-merge');
var clientConfig = require('./webpack.client.prod.js');
var serverConfig = require('./webpack.server.prod.js');

module.exports = [
  // Client
  clientConfig,

  // Server
  serverConfig
];
