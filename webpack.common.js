const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 解决打包后html文件引用地址的问题
// const CleanWebpackPlugin = require('clean-webpack-plugin') //清理/dist目录
const webpack = require('webpack')
module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/index.js'
  }, //整个webpack入口
  plugins: [
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      title: 'Hello Webpack'
    })
  ],
  output: {
    filename: '[name].bundle.js', //出口
    path: path.resolve(__dirname, 'dist'), //路径  __dirname表示该文件夹所在目录的绝对路径 加上dist 就是出口位置
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.css$/, //匹配规则  以.css结尾的文件
        use: ['style-loader', 'css-loader']
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
  }
}
