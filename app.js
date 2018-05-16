const koa = require('koa')
const convert = require('koa-convert')
const webpack = require('webpack')

const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')

const app = new koa()

const config = require('./webpack.base.conf.js')
const compiler = webpack(config)

const devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
      quiet: false,
    }
  })

app.use(convert(devMiddleware));
app.use(convert(webpackHotMiddleware(compiler, {
    // heartbeat: 1000,
    reload: true
})))
  // Serve the files on port 3000.
  app.listen(3000,  () => {
    console.log('Example app listening on port 3000!\n');
  });