const path = require('path');
const formidable = require('formidable'); // 解析文件上传的数据
const querystring = require('querystring');
const model = require('./model');

module.exports = {
  getIndexPage(req, res) {
    model.getAllHero((err, heros) => {
      if (err) throw err;
      res.render('index', {
        list: heros
      });
    });
  },
  showHeroInfo(req, res) {
    const { id } = req.query;
    model.getHeroById(id, (err, hero) => {
      if (err) throw err;
      res.render('info', hero);
    });
  },
  delHeroInfo(req, res) {
    const { id } = req.query;
    model.deleteHeroById(id, (err, result) => {
      if (err) throw err;
      if (result) {
        model.getAllHero((error, heros) => {
          res.render('index', {
            list: heros
          });
        });
      }
    });
  },
  addheroPage(req, res) {
    res.render('add', {});
  },
  sendImgFile(req, res) {
    const form = new formidable.IncomingForm();

    form.uploadDir = path.join(__dirname, '../img');
    form.keepExtensions = true;

    form.parse(req, function(err, fileds, files) {
      const rpath = path.relative(__dirname, files.avatar.path);

      const resultPath = `/${rpath.replace('\\', '/')}`;

      const result = {
        err_code: 0,
        path: resultPath
      };
      res.json(result);
    });
  },
  submitData(req, res) {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });
    // 传输完毕
    req.on('end', () => {
      // 使用querystring.parse解析post提交的数据
      const hero = querystring.parse(data);
      model.addHero(hero, (err, result) => {
        if (err) throw err;
        if (result) {
          // 302重定向
          res.writeHeader(302, {
            Location: '/'
          });
          res.end();
        }
      });
    });
  },
  getEditHero(req, res) {
    const { id } = req.query;
    model.getHeroById(id, (err, hero) => {
      if (err) throw err;
      res.render('edit', hero);
    });
  },
  uploadEditHero(req, res) {
    const form = new formidable.IncomingForm();

    form.uploadDir = path.join(__dirname, '../img');
    form.keepExtensions = true;
    form.encoding = 'utf-8';

    form.parse(req, (err, hero, files) => {
      if (files.avatar !== undefined) {
        const avatarPath = `/${path
          .relative(__dirname, files.avatar.path)
          .replace('\\', '/')}`;
        // img\1.jpg
        // 由于这个时候，hero字段中，并没有 avatar 头像路径，所以英雄信息不完整，需要将 avatarPath 设置到 hero中保存为avatar属性
        hero.avatar = avatarPath;
      }

      model.changeHeroInfo(hero, (inErr, result) => {
        if (inErr) throw inErr;
        if (result) {
          res.json({
            err_code: 0
          });
        }
      });
    });
  }
};
