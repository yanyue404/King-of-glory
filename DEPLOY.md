# 王者荣耀英雄管理器 - 部署指南

## Vercel 部署步骤

### 前提条件

- GitHub 账号
- Vercel 账号 (可以用 GitHub 账号登录)

### 部署步骤

1. **将项目推送到 GitHub**

   如果您的项目还不在 GitHub 上，请创建一个新的仓库并推送代码：

   ```bash
   git init
   git add .
   git commit -m "初始化项目"
   git remote add origin https://github.com/你的用户名/king-of-glory.git
   git push -u origin master
   ```

2. **使用 Vercel 部署**

   有两种方式可以部署：

   **方法 1: 通过 Vercel 网站**

   - 登录 [Vercel](https://vercel.com/)
   - 点击 "New Project"
   - 导入您的 GitHub 仓库
   - 保留默认设置并点击 "Deploy"

   **方法 2: 通过命令行**

   ```bash
   # 安装 Vercel CLI
   npm install -g vercel

   # 登录
   vercel login

   # 部署
   vercel
   ```

3. **访问您的应用**

   部署完成后，Vercel 会提供一个 URL（例如 https://king-of-glory.vercel.app）。您可以通过此 URL 访问您的应用。

## 部署注意事项

- 本项目已适配 Vercel 的无服务器环境
- `app.js` 文件导出了两种格式：
  - 服务器对象（用于本地开发和测试）
  - 处理函数（用于 Vercel 部署）
- `vercel.json` 文件已配置好路由规则，将请求转发到处理函数

## API 使用说明

部署后，您可以通过以下 API 访问英雄数据：

### 获取所有英雄列表

```
GET https://your-vercel-domain.vercel.app/api/heroes
```

### 获取特定英雄信息

```
GET https://your-vercel-domain.vercel.app/api/hero?id=1
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm start
```

## 项目结构

- `src/app.js` - 应用入口
- `src/router.js` - 路由配置
- `src/handler.js` - 请求处理函数
- `src/model.js` - 数据模型
- `src/views/` - HTML 模板
- `data.json` - 英雄数据
- `img/` - 图片资源
- `vercel.json` - Vercel 部署配置
