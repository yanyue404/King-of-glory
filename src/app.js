'use esversion：6';

const http = require('http');
const Router = require('./router');
const bindRender = require('./utils/utils.js');

const server = http.createServer();
server.on('request', (req, res) => {
  bindRender(res);
  Router(req, res);
});

// 本地开发时使用
if (process.env.NODE_ENV !== 'production') {
  server.listen(3000, function() {
    console.log('Run in localhost:3000 ');
  });
}

// 为了保持测试兼容性，导出服务器对象
module.exports = server;

// 为 Vercel 导出处理函数
module.exports.handler = (req, res) => {
  bindRender(res);
  Router(req, res);
};
