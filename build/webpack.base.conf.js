const path = require('path') // 导入路径包
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const env = process.env.NODE_ENV
const isProduction = env === 'production'
const fs = require('fs')

const vueCssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: isProduction,
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

let config = {
  devtool: isProduction ? 'none' : 'eval',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.jsx', '.json', '.scss'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'pages': path.resolve(__dirname, '..', 'src/pages'),
      'components': path.resolve(__dirname, '..', 'src/components'),
      'common': path.resolve(__dirname, '..', 'src/common')
    }
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [isProduction ? 'css-loader?minimize' : 'css-loader']
        })
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [isProduction ? 'css-loader?minimize' : 'css-loader', 'sass-loader']
        })
      },
      { test: /\.tsx?$/, loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/], // 解析.vue文件需要添加
        }
      },
      {
        test: /\.html$/,
        loader: './tools/loaders/swig-loader',
        query: {
          // env: env,
          // platform: platform,
          // config: config
        },
        include: [path.resolve('./src')]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: vueCssLoaders({
            sourceMap: isProduction,
            extract: isProduction
          }),
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      }
    ]
  },
  plugins: isProduction ? [
    new UglifyJsPlugin({
      cache: true, // 是否启用缓存
      parallel: true // 启用并发
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ] : [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(env)
    })
  ]
}

module.exports = config