var webpackMerge = require('webpack-merge');
var path = require('path');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
/**
 * Webpack Constants
 */

module.exports = webpackMerge(commonConfig, {
  target: 'node',

  entry: {
    'server': './src/server',
  },

  output: {
    libraryTarget: 'commonjs2',
    path: helpers.root('dist/server'),
    filename: '[name].js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
  },
  module: {
    rules: [
      { enforce: 'pre', test: /angular2-material/, loader: "imports-loader?window=>global" },
    ],
  },
  plugins: [
    new UglifyJsPlugin({
      // beautify: true, //debug
      // mangle: false, //debug
      // dead_code: false, //debug
      // unused: false, //debug
      // deadCode: false, //debug
      // compress: {
      //   screw_ie8: true,
      //   keep_fnames: true,
      //   drop_debugger: false,
      //   dead_code: false,
      //   unused: false
      // }, // debug
      // comments: true, //debug


      beautify: false, //prod
      mangle: { screw_ie8 : true, keep_fnames: true }, //prod
      compress: { screw_ie8: true }, //prod
      comments: false //prod
    })
  ],
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
    '@angular2-material/tooltip'
  ]),
  node: {
    global: true,
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: true,
    crypto: 'empty',
    process: false,
    module: false,
    clearImmediate: false,
    setImmediate: false
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

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [__dirname].concat(args));
}
