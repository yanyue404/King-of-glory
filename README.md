# King-of-glory [![Build Status](https://travis-ci.org/xiaoyueyue165/King-of-glory.svg?branch=master)](https://travis-ci.org/xiaoyueyue165/King-of-glory)

> 王者荣耀-nodejs 英雄管理器（CRUD）

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:3000
npm start

```

## Show Time

![images](./screenshot/showTime.gif)

## Vercel 部署

本项目已适配 Vercel 部署，可以通过以下步骤部署到 Vercel：

1. 安装 Vercel CLI：

```bash
npm i -g vercel
```

2. 登录 Vercel：

```bash
vercel login
```

3. 在项目根目录下执行部署命令：

```bash
vercel
```

## API 接口

部署后可以通过以下 API 接口访问：

- 获取所有英雄列表：`GET /api/heroes`
- 获取单个英雄信息：`GET /api/hero?id=英雄ID`

## 访问地址

部署成功后，可以通过 Vercel 分配的域名访问，例如：`https://king-of-glory.vercel.app`
