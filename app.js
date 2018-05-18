const koa = require('koa')
const convert = require('koa-convert')
const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const serve = require('koa-static')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')

const app = new koa()
const router = new Router()
app.use(serve(path.join(__dirname, './dist')))
let config
let indexHTML

if (process.env.NODE_ENV === 'production') {
  console.log(11)
  config = require('./webpack.prod.js')
} else {
  config = require('./webpack.dev.js')
}

const compiler = webpack(config)

if (process.env.NODE_ENV !== 'production') {
  const devMiddleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
      quiet: false
    }
  })
  app.use(convert(devMiddleware))
  app.use(
    convert(
      webpackHotMiddleware(compiler, {
        // heartbeat: 1000,
        reload: true
      })
    )
  )
  clientCompiler.plugin('done', () => {
    let fs = devMiddleware.fileSystem
    let filePath = path.join(config.output.path, 'index.html')
    if (fs.existsSync(filePath)) {
      let index = fs.readFileSync(filePath, 'utf-8')
      indexHTML = index
    }
  })
} else {
  console.log(11)
  indexHTML = fs.readFileSync(path.resolve('./dist/index.html'), 'utf-8')
}
console.log(indexHTML)
// router.get('/', (ctx, next) => {
//   console.log(indexHTML)
//   if (!indexHTML) {
//     ctx.body = 'waiting for compilation... refresh in a moment.'
//   } else {
//     ctx.set('Content-Type', 'text/html')
//     ctx.body = indexHTML
//   }
// })
// Serve the files on port 3000.
app.listen(3000, () => {
  console.log('Example app listening on port 3000!\n')
})
