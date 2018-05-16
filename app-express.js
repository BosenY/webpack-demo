const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.base.conf.js');
const compiler = webpack(config);

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
let devMiddleware  = require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      chunks: false,
      quiet: false,
    }
  })
app.use(devMiddleware);
let indexHTML
// compiler.plugin('done', () => {
//     let fs = devMiddleware.fileSystem
//     let filePath = path.join(config.output.path, 'index.html')
//     if (fs.existsSync(filePath)) {
//       let index = fs.readFileSync(filePath, 'utf-8')
//       console.log(index)
//       indexHTML = index
//     }
// })
app.use(require("webpack-hot-middleware")(compiler, {
    heartbeat: 2000,
    reload: true
}))
// app.get("/", function(req, res) {
//     res.sendFile(__dirname + '/index.html');
//     // res.end(indexHTML)
// })
// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});