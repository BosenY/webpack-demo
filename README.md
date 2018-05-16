# Webpack 学习

## 具体几个概念

loader 和 plugin 区别

* loader: 相当于一个转换器， 把文件进行转换
* plugin: 一个扩展器，它丰富了 webpack 本身，是针对于 loader 结束之后，它不会直接去操作文件，而是基于了事件机制 工作， 来监听 webpack 打包过程当中的 某些节点:

```js
{
    'run':'开始编译',
    'make':'从entry开始递归分析依赖并对依赖进行build',
    'build-moodule':'使用loader加载文件并build模块',
    'normal-module-loader':'对loader加载的文件用acorn编译，生成抽象语法树AST',
    'program':'开始对AST进行遍历，当遇到require时触发call require事件',
    'seal':'所有依赖build完成，开始对chunk进行优化（抽取公共模块、加hash等）',
    'optimize-chunk-assets':'压缩代码',
    'emit':'把各个chunk输出到结果文件'
}
```

### 自动编译

webpack 提供了三种自动编译代码的方法：

* 使用`watch` 模式
* `webpack-dev-server`
* `webpack-dev-middleware`

#### watch

在运行 webpack 的命令后面加上 `--watch`，他会去监听依赖图中所有文件的更改，一旦更改，代码就会被重新编译，但有明显的缺点： 你必须手动刷新浏览器

#### webpack-dev-server

帮你启动一个服务来进行开发，会直接自动编译

优点：简单，vue-cli 的开发环境就是用这种方式来启动的

#### webpack-dev-middleware

自定义一个容器，结合一个自启动的服务器来搭配使用，比如`koa`和`express`

优点：高度自定义，可以在 server 中写其他逻辑
