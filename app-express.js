const express = require('express')
const webpack = require('webpack')
const path = require('path')
const app = express()
let config

if (process.env.NODE_ENV === 'production') {
  config = require('./webpack.prod.js')
} else {
  config = require('./webpack.dev.js')
}
app.use('/', express.static(__dirname + '/dist'))

const compiler = webpack(config)

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

if (process.env.NODE_ENV !== 'production') {
  let devMiddleware = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
      quiet: false
    }
  })
  app.use(devMiddleware)
  app.use(
    require('webpack-hot-middleware')(compiler, {
      heartbeat: 2000,
      reload: true
    })
  )
}

let indexHTML

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/dist/index.html')
// })
// Serve the files on port 3000.
app.listen(3000, function() {
  console.log('Example app listening on port 3000!\n')
})
