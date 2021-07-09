### 项目说明

前端(PC)端项目
- 项目名
    - [node_modules]   存放第三方node模块 由npm自动创建
    - [interface]      存放php接口文件
        - [library]    php库文件 conn
    - [src]            存放源代码(开发环境代码)
        - [html]
            - index.html
            - product.html
            - shop.html
            - reg.html
            - login.html
        - [js]
            -[library]  存放前端库文件(模块)
                - jquery.js
                - bootstrap.js
                - cookie.js
                - querystring.js
            - index.js
            - product.js
            - shop.js
        - [styles]
            - index.less
            - product.less
            - header.less
        - [imgs]
    - [dist]           存放部署环境代码(工具生成的代码) grunt gulp webpack ...
        - [html]
            - index.html
            - product.html
        - [js]
            - [library]
                - jquery.min.js
                - bootstrap.min.js
                - cookie.min.js
                - querystring.min.js
            - index.min.js
            - product.min.js
        - [css]
            - index.min.css
            - product.min.css
        - [imgs]
    - README.md        项目说明
    - .gitignore       git忽略文件
    - package.json     初始化项目时自动生成(npm init -y)
    - gulpfile.js      gulp工具配置文件

-------------------
在将目录结构创建好以后
1. 填写一个git忽略文件 
2. 初始化项目(在项目根目录执行)   `$ npm init -y`
3. 初始化代码管理工具 `$ git init`

-------------------
### 项目构建工具 gulp
Gulp.js 是基于nodejs 构建的, 它利用了Nodejs的流控制能力 辅助项目构建.
你可以快速通过Gulp构建项目 减少频繁的I/O操作.

项目的代码 划分成三类
1. 源代码(用于开发环境)
2. 第三方代码(jquery bootstrap)
3. 部署代码(用于部署服务器环境的代码 由工具生成)


### nrm 工具
npm(nodejs包管理工具库) 它的服务器在国外 访问速度慢
使用国内镜像提升访问速度
国内的npm镜像由阿里云免费提供

两种使用方式
1. 使用 nrm 工具切换镜像源
```bash
$ npm install nrm -g   # 全局安装nrm
$ nrm ls               # 查看所有镜像源
$ nrm use taobao       # 切换到taobao镜像
```

2. 使用cnpm工具代替npm工具 (推荐)
```bash
$ npm install cnpm -g --registry=https://registry.npm.taobao.org/
```

### 第三方工具(库) 安装
```bash
### 安装
$ cnpm install[i] package[@verstion] -g             # 全局安装(命令行工具)
$ cnpm install[i] package[@verstion] --save[-S]     # 项目依赖安装(项目中需要用到的代码)
$ cnpm install[i] package[@verstion] --save-dev[-D] # 项目开发依赖安装(开发工具)
```

使用 npm/cnpm 安装依赖时 需要在项目的根目录执行命令
osx用户进行全局安装时 需要获得超级管理员权限 `sudo -s`

```bash
$ cnpm uninstall pakcage --save   # 卸载模块
```

### gulp安装
```bash
# 全局安装的东西 每台电脑只需要进行一次安装
$ cnpm i gulp -g      # 全局安装gulp
$ cnpm i gulp-cli -g  # 全局安装gulp命令行工具
$ cnpm i gulp -D      # 项目开发依赖安装gulp(必须在项目根目录执行)
```