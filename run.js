var webpack = require('webpack')
var opn = require('opn')
// 可换成express 等其他server
var webpackDevServer = require('webpack-dev-server')
var config = require('./build/webpack.dev.conf.js')
var compiler = webpack(config)
var server = new webpackDevServer(compiler, {
  publicPath: config.output.publicPath,
  hot: true,
  noInfo: false,
  stats: { colors: true }
})
server.listen(8888)
console.log('******************************************')
console.log('***  server start on http://localhost:8888    ***')
console.log('******************************************')

// var url = 'http://localhost:' + port
var url = 'http://localhost:8888/dist/index.html'

opn(url)
