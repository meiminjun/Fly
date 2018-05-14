const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require('fs')

// var entry = fs.readdirSync(path.join(__dirname, '..', 'src/components/vue')).reduce((entryObj, dir) => {
//     const fullDir = path.join(__dirname, '..', 'src/components/vue' + dir)
//     const entry = path.join(fullDir, 'index.js')
//     console.log(fs.statSync(fullDir).isDirectory())
//     if (fs.statSync(fullDir).isDirectory() && fs.existsSync(entry)) {
//         entryObj[dir] = entry
//     }
//     return entryObj
// }, {})

const webpackConfig = merge(baseWebpackConfig({
    mode: 'production',
}), {
    entry: {
        'loading': path.resolve(__dirname, '../src/components/loading/index.js'),
        'message': path.resolve(__dirname, '../src/components/message/index.js'),
        'loadMore': path.resolve(__dirname, '../src/components/loadMore/index.js'),
        'keyboard': path.resolve(__dirname, '../src/components/keyboard-pay/index.js')
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/dist/',
        filename: '[name]/index.js'
    },
    plugins:[
        new ExtractTextPlugin('[name]/style.css')
    ],
    externals: {
        vue: {
            root: 'Vue',
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue'
        }
    },
})

module.exports = webpackConfig
