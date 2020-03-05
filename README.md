# 微型问卷调查系统 TypeScript 版

适用于学校及单位的问卷调查系统，其特点在于参与人员需提前导入，在可控范围内进行问卷调查。

## 功能
1. 创建问卷、编辑问卷、删除问卷、修改问卷截止时间
2. 可查看结果统计、样本数据、回收情况，单题目交叉分析
3. 使用 Excel 批量导入用户、批量删除用户，用户管理
4. 问卷调查页面适配移动端
5. 支持 TypeScript

## 目录结构

```bash
├── public                     # public static assets (directly copied)
│   │── favicon.ico            # favicon
│   └── index.html             # index.html template
├── src                        # main source code
│   ├── api                    # api service
│   ├── assets                 # module assets like fonts, images (processed by webpack)
│   ├── components             # global components
│   ├── config                 # config of enum etc.
│   ├── filters                # global filter
│   ├── plugins                # third party packages
│   ├── router                 # router
│   ├── store                  # store
│   ├── types                  # namespace declaration
│   ├── utils                  # global utils
│   ├── views                  # views
│   ├── App.vue                # main app component
│   ├── global.d.ts            # third types declaration
│   ├── main.ts                # app entry file
│   ├── shim-request-proper-
        ty.d.ts                # bind $axios on Vue property
│   ├── shims-tsx.d.ts         # type definition shims
│   └── shims-vue.d.ts         # type definition shims
├── tests/                     # tests
├── .browserslistrc            # browserslist config file (to support Autoprefixer)
├── .editorconfig              # editor code format consistency config
├── .env.xxx                   # env variable configuration
├── .eslintrc.js               # eslint config
├── babel.config.js            # babel config
├── jest.config.js             # jest unit test config
├── package.json               # package.json
├── tsconfig.json              # typescript config
└── vue.config.js              # vue-cli config
```

## 项目运行

#### 安装依赖

```bash
yarn install
```

#### 开发调试

```bash
yarn run serve
```

#### 生产环境部署

```bash
yarn run build
```

#### 自定义 Vue 配置

查看 [Configuration Reference](https://cli.vuejs.org/config/). 

## 第三方插件

- xlsx
- file-saver
- element-ui
- echarts
- qrcode
- clipboard

## 批量导入

用户批量导入模板文件见 `/Import_Template.xls`

## API 及数据库

#### .env.development

本地环境请修改根目录下 `.env.development` 文件中的 `VUE_APP_BASE_API` 为本地调试的后端部署地址。

#### .env.production

生产环境请修改根目录下 `.env.production` 文件中的 `VUE_APP_BASE_API` 为线上的后端部署地址。

查看 [vue-questionnaire-api](https://github.com/52admln/vue-questionnaire-api). 

> 后端代码不堪入目，已计划重构。


## LICENSE

MIT

## 鼓励

<img src="https://raw.githubusercontent.com/52admln/static-images/master/img/donate.png" width="60%" />
