'use strict'

const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    library: '$router',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'router.min.js',
    globalObject: 'this'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'test'),
    compress: true,
    port: 9224,
    open: true
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader'
      }
    }]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map',
  externals: /^(@babel\/runtime|core-js|@ecomplus\/(utils|client)|universal-router)/
}
