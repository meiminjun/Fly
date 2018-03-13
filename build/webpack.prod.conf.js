const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpackConfig = merge(baseWebpackConfig, {
  entry: {
    fly: './src/components/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: 'fly.js',
    library: 'fly',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  plugins: [
    new ExtractTextPlugin('fly.css') // 分离css的地址
  ]
})

module.exports = webpackConfig
