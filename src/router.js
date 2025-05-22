const fs = require('fs');
const path = require('path');
const urlParse = require('url');
const handler = require('./handler');
const model = require('./model');

module.exports = function(req, res) {
  const { pathname: url, query } = urlParse.parse(req.url, true);
  // 将 req.url中解构出来的 query 查询参数，添加为 req 对象的自定义属性，属性名叫做 query
  req.query = query;
  // 获取请求的URL地址
  // var url = req.url;
  // console.log(url);

  // 通过 req.method 获取到 请求方式
  const method = req.method.toLowerCase();

  // 设置跨域访问头
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理 OPTIONS 预检请求
  if (method === 'options') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (url === '/') {
    // 默认
    handler.getIndexPage(req, res);
  } else if (url === '/info') {
    // 查看
    console.log(req);
    handler.showHeroInfo(req, res);
  } else if (url === '/del') {
    // 删除
    handler.delHeroInfo(req, res);
  } else if (url === '/add' && method === 'get') {
    // 添加
    handler.addheroPage(req, res);
  } else if (url === '/ajaxPostFile' && method === 'post') {
    // 上传图片
    handler.sendImgFile(req, res);
  } else if (url === '/add' && method === 'post') {
    // 提交英雄数据
    handler.submitData(req, res);
  } else if (url === '/edit' && method === 'get') {
    // 编辑页面
    handler.getEditHero(req, res);
  } else if (url === '/uploadEditData' && method === 'post') {
    handler.uploadEditHero(req, res);
  }
  // API 路由
  else if (url === '/api/heroes' && method === 'get') {
    // 获取所有英雄列表 API
    model.getAllHero((err, heros) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(heros));
    });
  } else if (url === '/api/hero' && method === 'get') {
    // 获取单个英雄信息 API
    const { id } = req.query;
    model.getHeroById(id, (err, hero) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
        return;
      }
      if (!hero) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Hero not found' }));
        return;
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(hero));
    });
  } else if (
    url.indexOf('/img/') === 0 ||
    url.indexOf('/node_modules/') === 0
  ) {
    // 处理图片请求和 node_modules 模块的资源文件请求
    fs.readFile(path.join(__dirname, `../${url}`), (err, data) => {
      if (err) {
        res.end('404');
      } else {
        // 判断是否为CSS文件，如果是CSS，则添加 header 信息
        if (/\.css$/.test(url)) {
          res.writeHeader(200, {
            'Content-Type': 'text/css; charset=utf-8'
          });
        }
        res.end(data);
      }
    });
  }
};
