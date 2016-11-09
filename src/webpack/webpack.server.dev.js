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
      { enforce: 'pre', test: /angular2-material|ng2-uploader/, loader: "imports-loader?window=>global" },
    ],
  },
  externals: includeClientPackages([
    // include these client packages so we can transform their source with webpack loaders
    '@angular2-material/button',
    '@angular2-material/button',
    '@angular2-material/card',
    '@angular2-material/checkbox',
    '@angular2-material/core',
    '@angular2-material/grid',
    '@angular2-material/icon',
    '@angular2-material/input',
    '@angular2-material/list',
    '@angular2-material/menu',
    '@angular2-material/progress',
    '@angular2-material/progress',
    '@angular2-material/radio',
    '@angular2-material/sidenav',
    '@angular2-material/slider',
    '@angular2-material/slide',
    '@angular2-material/tabs',
    '@angular2-material/toolbar',
    '@angular2-material/tooltip',
    'ng2-uploader'
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