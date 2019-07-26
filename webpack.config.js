'use strict'

const devMode = process.env.NODE_ENV !== 'production'
const path = require('path')

// preset default output object
const output = {
  library: 'StorefrontRouter',
  libraryTarget: 'umd',
  libraryExport: 'default',
  path: path.resolve(__dirname, 'dist'),
  filename: 'storefront-router.min.js',
  globalObject: 'this'
}

// base Webpack config
const config = {
  mode: devMode ? 'development' : 'production',
  entry: path.resolve(__dirname, 'src/index.js'),
  output,
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
  externals: devMode ? '' : /^(@babel\/runtime|core-js|@ecomplus\/(utils|client))/
}

module.exports = devMode
  // single config object for dev server
  ? config
  // production outputs with and without polyfill
  : [
    config,
    {
      ...config,
      output: {
        ...output,
        filename: output.filename.replace('.min.js', '.polyfill.min.js')
      },
      externals: /^(@ecomplus\/(utils|client))/
    }
  ]
