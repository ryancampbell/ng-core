const webpack = require('webpack');
const helpers = require('./helpers');

const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const HtmlElementsPlugin = require('./html-elements-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.ts', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader',
        // exclude: [helpers.root('src/index.html')]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        loaders: ['to-string-loader', 'css-loader']
      },

      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader']
      },
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),

    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)src(\\|\/)linker/,
      helpers.root('./src')
    ),

    new CopyWebpackPlugin([{
      from: 'src/**/*.html'
    }]),

    // new HtmlWebpackPlugin({
    //   template: 'src/index.html',
    //   chunksSortMode: 'dependency'
    // }),

    // new HtmlElementsPlugin({
    //   headTags: require('./head-config.common')
    // }),
  ],

  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};


