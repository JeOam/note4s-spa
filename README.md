# note4s-spa

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```


开发规范：

* 采用数据驱动的交互实现，避免直接操作 DOM
* 采用 Bulma(Flexbox), Font Awesome, Vue.js 2 版本开发
* Webpack 用于自动化构建，通过 Babel 使用 ES6/ES7 语法开发
* 同时兼容 Desktop 和 Mobile 端
* 支持 Chrome, Safari, 不考虑支持 IE
* 布局主要参考 Twitter，交互配色主要参考 GitHub
* 状态管理必要时，采用单向数据流的方法（Vuex）, 在不需要跨组件通讯时，尽量避免使用 Vuex
* 异步函数调用采用 async await 的写法

参考：
* [Bulma css](https://github.com/jgthms/bulma/blob/master/css/bulma.css)
* [2.0 Changes](https://github.com/vuejs/vue/issues/2873)
* [bulma-templates](https://github.com/dansup/bulma-templates): html templates for the bulma css framework
* [「大概可能也许是」目前最好的 JavaScript 异步方案 async/await](https://segmentfault.com/a/1190000004031880)
