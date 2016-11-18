var webpackMerge = require('webpack-merge');
var path = require('path');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

/**
 * Webpack Constants
 */

module.exports = webpackMerge(commonConfig, {
  target: 'node',

  entry: {
    'server': './biz.server',
  },

  output: {
    path: helpers.root('dist/server'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      { enforce: 'pre', test: /angular\/material/, loader: "imports-loader?window=>global" },
    ],
  },
  externals: includeClientPackages([
    // include these client packages so we can transform their source with webpack loaders
    '@angular/material'
  ]),
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true
  }
});

function includeClientPackages(packages) {
  return function(context, request, cb) {
    if (packages && packages.indexOf(request) !== -1) {
      return cb();
    }
    return checkNodeImport(context, request, cb);
  };
}
// Helpers
function checkNodeImport(context, request, cb) {
  if (!path.isAbsolute(request) && request.charAt(0) !== '.') {
    cb(null, 'commonjs ' + request); return;
  }
  cb();
}