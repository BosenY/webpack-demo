const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
module.exports = merge(common, {
  output: {
    // filename: '[name].bundle.js', //出口
    // path: path.resolve(__dirname, 'dist'), //路径  __dirname表示该文件夹所在目录的绝对路径 加上dist 就是出口位置
    // publicPath: '/dist/'
  },
  plugins: [new UglifyJSPlugin()]
})
