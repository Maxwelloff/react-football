var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpackPostcssTools = require("webpack-postcss-tools");
var globalMap = webpackPostcssTools.makeVarMap("web_modules/app/css/global.css");

module.exports = {
  devtool: 'source-map',
  entry: [
    './web_modules/app/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.ProvidePlugin({
        fetch: "exports?self.fetch!whatwg-fetch"
    }),
    new ExtractTextPlugin("styles.css"),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'web_modules')
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        "style-loader",
        "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]"
       ),
      include: path.join(__dirname, 'web_modules')
    }]
  },
  postcss: [
    require("autoprefixer"),
    require("postcss-custom-properties")({
        variables: globalMap.vars
    }),
    require("postcss-custom-media")({
        extensions: globalMap.media
    }),
    require("postcss-calc")
  ],
};
