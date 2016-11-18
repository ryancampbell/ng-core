var webpack = require('webpack');
var webpackMerge = require('webpack-merge');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');

const CopyWebpackPlugin = require('copy-webpack-plugin'),
  UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin'),
  DefinePlugin = require('webpack/lib/DefinePlugin');

module.exports = webpackMerge(commonConfig, {
  target: 'web',

  entry: {
    'root': './biz.client' // TODO: Make this dynamic
  },

  output: {
    path: helpers.root('dist/client'),
    filename: '[name].js',
    sourceMapFilename: '[name].[chunkhash].bundle.map',
    chunkFilename: '[id].[chunkhash].chunk.js'
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
    }),

    new webpack.optimize.CommonsChunkPlugin('common'),

    new DefinePlugin({
      'ENV': "'production'",
      'process.env': {
        'ENV': "'production'"
      }
    }),

    new CopyWebpackPlugin([{
      context: 'src',
      from: '**/index.html',
      to: '..'
    }])
  ],

  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
});
