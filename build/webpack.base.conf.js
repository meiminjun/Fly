const path = require('path') // 导入路径包
const webpack = require('webpack')
var isProduction;
const fs = require('fs')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

// function root(sub) {
//   return path.join(path.resolve(), sub);
// }

const vueCssLoaders = function (options) {
  options = options || {}
  // console.log(isProduction)
  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: isProduction,
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
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

let config =

  module.exports = options => {
    let mode = options.mode
    isProduction = mode === 'production'
    // console.log('测试')
    // console.log(isProduction)
    return {
      mode: mode,
      devtool: isProduction ? 'none' : 'eval-source-map',
      // entry: {
      //   docs: './src/pages/docs/index'
      // },
      // entry: entry,
      // output: {
      //   path: path.resolve(__dirname, 'build'),
      //   filename: '[name].js',
      //   publicPath: 'http://localhost:3333/build/'
      // },
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
        noParse: /jquery|lodash/,
        rules: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            include: [
              resolve('src')
            ]
          },
          {
            test: /\.tsx?$/,
            use: [
              {
                loader: 'babel-loader'
              },
              {
                loader: 'ts-loader',
                options: {
                  appendTsSuffixTo: [/\.vue$/] // 解析.vue文件需要添加
                }
              }
            ],
            include: [
              resolve('src')
            ]
          },
          {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader']
            })
          },
          {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'sass-loader']
            })
          },
          {
            test: /\.hbs$/,
            loader: 'handlebars-loader?helperDirs[]=' + __dirname + '/helpers',
            exclude: /node_modules/
          },
          {
            test: /\.html$|njk|nunjucks/,
            use: [
              'html-loader',
              {
                // loader: 'nunjucks-html-loader',
                loader: './tools/loaders/nunjucks-loader',
                options: {
                  // Other super important. This will be the base
                  // directory in which webpack is going to find
                  // the layout and any other file index.njk is calling.
                  searchPaths: ['./src/pages']
                }
              }
            ]
          },
          {
            test: /\.md$/,
            use: [
              {
                loader: 'html-loader'
              },
              {
                loader: 'markdown-loader',
                options: {
                  pedantic: true,
                  highlight: (code, lang) => {
                    if (lang) {
                      hljs.highlightAuto(code, [lang]).value
                    }
                    return hljs.highlightAuto(code).value
                  }
                }
              }
            ]
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
            include: resolve('src'),
            exclude: /node_modules/,
            query: {
              limit: 8192,
              outputPath: 'pages/[name]/images/'
            }
          }
        ]
      }
    }
  }
