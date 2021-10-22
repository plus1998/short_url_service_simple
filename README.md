# 说明

Egg.js+Redis 短链接生成

## 使用
1. 将域名解析到服务器地址
2. 配置nginx域名反向代理到7001
3. 调用接口/domain配置好域名
4. 根据接口文档使用shortlenUrl / reductUrl

## 接口

全部get请求，query传参数

|接口|参数|说明|
|:----    |:---|-----   |
|/url/shortlen |url,(domain)  |缩短链接 domain可选 不选又不配置返回localhost   |
|/url/reduct |code  | 还原链接   |
|/domain/list     |无  | 预设域名列表    |
|/domain/add     |domain  | 新增域名    |
|/domain/remove     |domain  | 移除域名    |
|/domain/clear     |无  | 清空域名    |

***
以下是egg.ts readme


# hackernews-async-ts

[Hacker News](https://news.ycombinator.com/) showcase using typescript && egg

## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
