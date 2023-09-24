const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpaclDevHotMiddleware = require('webpack-hot-middleware')

const app = express();
const config = require('./webpack.config.js');

const compiler = webpack(config);


// 告知 express 使用 webpack-dev-middleware（中间件）和 webpack-hot-middleware中间件
// 以及将 webpack.config.js 配置文件作为基础配置。
app
    .use(webpackDevMiddleware(compiler, {
        publicPath: config.output.publicPath,
    }))
    .use(webpaclDevHotMiddleware(compiler, {
        reload: true,
        heartbeat: 10000
    }))



// 启动服务，监听服务端口
app.listen(9090, function () {
    console.log('Example app listening on port 9090!\n');
});