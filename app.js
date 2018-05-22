const logger = require('koa-logger')
const koa = require('koa')
const convert = require('koa-convert')
const webpack = require('webpack')
const fs = require('fs')
const path = require('path')
const Router = require('koa-router')
const serve = require('koa-static')
const webpackDevMiddleware = require('koa-webpack-dev-middleware')
const webpackHotMiddleware = require('koa-webpack-hot-middleware')

const opn = require('opn')

const app = new koa()
app.use(logger())
const router = new Router()
let env = process.env.NODE_ENV
let config
let indexHTML

if (env === 'production') {
  config = require('./webpack.prod.js')
} else {
  config = require('./webpack.dev.js')
}

const compiler = webpack(config)

if (env !== 'production') {
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
  compiler.plugin('done', () => {
    let fs = devMiddleware.fileSystem
    let filePath = path.join(config.output.path, 'index.html')
    if (fs.existsSync(filePath)) {
      let index = fs.readFileSync(filePath, 'utf-8')
      indexHTML = index
    }
  })
} else {
  app.use(serve(path.join(__dirname, './dist')))
  indexHTML = fs.readFileSync(path.resolve('./dist/index.html'), 'utf-8')
}

router.get('/', (ctx, next) => {
  if (!indexHTML) {
    ctx.body = 'waiting for compilation... refresh in a moment.'
  } else {
    ctx.set('Content-Type', 'text/html')
    ctx.body = indexHTML
  }
})
router.get('/api', (ctx, next) => {
  console.log(111)
  ctx.body = {
    res: true,
    data: 'This is api '
  }
})
app.use(router.routes()).use(router.allowedMethods())
// Serve the files on port 3000.
app.listen(4000, () => {
  console.log('Example app listening on port http://localhost:4000!\n')
  if (env === 'development') {
    opn('http://localhost:4000')
  }
})
