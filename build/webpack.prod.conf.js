const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig({
  mode: 'production'
}), {
  entry: {
    fly: './src/components/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'fly.js',
    library: 'fly',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this'
  },
  plugins:[
    new ExtractTextPlugin('fly.css')
  ]
})

module.exports = webpackConfig
