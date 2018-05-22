const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 解决打包后html文件引用地址的问题
// const CleanWebpackPlugin = require('clean-webpack-plugin') //清理/dist目录
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpack = require('webpack')
module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app:
      process.env.NODE_ENV === 'production'
        ? './src/index.js'
        : ['webpack-hot-middleware/client?name=app', './src/index.js'],
    another:
      process.env.NODE_ENV === 'production'
        ? './src/another-module.js'
        : ['webpack-hot-middleware/client?name=app', './src/another-module.js'],
    vendors: ['lodash']
  }, //整个webpack入口

  output: {
    filename: '[name].bundle.js', //出口
    path: path.resolve(__dirname, 'dist'), //路径  __dirname表示该文件夹所在目录的绝对路径 加上dist 就是出口位置
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.less/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'less-loader'
        })
      },
      {
        test: /\.css$/, //匹配规则  以.css结尾的文件
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      },
      {
        test: /\.(csv|tsv)$/,
        use: ['csv-loader']
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      }
    ]
  },
  plugins: [
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'common' // 指定公共 bundle 的名称。
    // }),
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      title: 'Hello Webpack'
    }),
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        verdors: {
          name: 'verdors'
        },
        commons: {
          name: 'commons',
          chunks: 'initial',
          minChunks: 2
        }
      }
    }
  }
}
