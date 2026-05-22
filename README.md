# Rabbit Market

Rabbit Market 是一个基于 Vue 3 和 Vite 构建的电商前端项目，包含首页推荐、商品分类、商品详情、购物车、订单结算、支付结果、登录和会员中心等常见商城功能。

## 技术栈

- Vue 3
- Vite
- Vue Router
- Pinia
- Pinia Persistedstate
- Element Plus
- Axios
- Sass
- Dayjs

## 功能模块

- 首页：轮播图、新鲜好物、人气推荐、商品列表展示
- 分类：一级分类、二级分类、分类筛选和商品列表
- 商品详情：商品基础信息、SKU 选择、热门商品推荐
- 购物车：加入购物车、删除商品、单选/全选、数量和金额统计
- 订单：结算页、创建订单、订单详情
- 支付：支付页和支付回跳页
- 用户：登录、用户信息、订单列表
- 布局：顶部导航、吸顶导航、页脚、图片懒加载指令

## 项目结构

```text
Rabbit-Market
├─ public/                 # 静态资源
├─ src/
│  ├─ apis/                # 接口请求封装
│  ├─ assets/              # 图片等项目资源
│  ├─ components/          # 通用组件
│  ├─ directives/          # 自定义指令
│  ├─ router/              # 路由配置
│  ├─ stores/              # Pinia 状态管理
│  ├─ styles/              # 全局样式和 Element Plus 样式变量
│  ├─ utils/               # 工具函数和 Axios 实例
│  ├─ views/               # 页面视图
│  ├─ App.vue
│  └─ main.js
├─ index.html
├─ package.json
└─ vite.config.js
```

## 环境要求

项目使用 Vite 8，对 Node.js 版本有要求：

```text
Node.js ^20.19.0 || >=22.12.0
```

建议使用 npm 安装依赖，项目已提交 `package-lock.json`。

## 快速开始

安装依赖：

```sh
npm install
```

启动开发环境：

```sh
npm run dev
```

构建生产包：

```sh
npm run build
```

本地预览生产构建：

```sh
npm run preview
```

格式化源码：

```sh
npm run format
```

## 接口说明

项目通过 `src/utils/http.js` 统一创建 Axios 实例，默认接口地址为：

```text
http://pcapi-xiaotuxian-front-devtest.itheima.net
```

登录后会从 Pinia 的用户状态中读取 `token`，并在请求头中自动携带：

```text
Authorization: Bearer <token>
```

主要接口模块位于 `src/apis/`：

- `layout.js`：导航分类
- `home.js`：首页轮播、新品、人气、商品推荐
- `category.js`：分类和子分类商品
- `detail.js`：商品详情和热门商品
- `cart.js`：购物车
- `checkout.js`：结算和订单
- `order.js`：用户订单
- `user.js`：登录

## 路由页面

| 路径 | 页面 |
| --- | --- |
| `/` | 首页 |
| `/category/:id` | 一级分类 |
| `/category/sub/:id` | 二级分类 |
| `/detail/:id` | 商品详情 |
| `/cartlist` | 购物车 |
| `/checkout` | 订单结算 |
| `/pay` | 支付页 |
| `/paycallback` | 支付回跳 |
| `/member` | 会员信息 |
| `/member/order` | 会员订单 |
| `/login` | 登录 |

## 开发说明

- 路径别名 `@` 指向 `src` 目录。
- Element Plus 已配置自动导入，组件和样式按需引入。
- Sass 全局注入了 `src/styles/element/index.scss` 和 `src/styles/var.scss`。
- 用户信息和购物车数据使用 Pinia Persistedstate 做本地持久化。
- 自定义指令插件在 `src/directives/` 中统一注册。

## 推荐开发工具

- Visual Studio Code
- Vue Official 扩展
- Vue DevTools 浏览器扩展
