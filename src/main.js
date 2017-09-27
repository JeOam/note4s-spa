import 'babel-polyfill'
import 'src/vendors/jquery.caret'

import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import App from './App'
import routes from './routes'
import store from './vuex/store'

import VueMarkdown from 'layout/VueMarkdown'
import clickoutside from './directives/clickoutside'
import { timeago } from './filters'

Vue.use(VueRouter)
Vue.directive('clickoutside', clickoutside)
Vue.component('vue-markdown', VueMarkdown)
Vue.filter('timeago', timeago)

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  scrollBehavior: () => ({ y: 0 }),
  routes
})
router.beforeEach((route, redirect, next) => {
  NProgress.inc(0.2)
  next()
})
router.afterEach((route, redirect, next) => {
  NProgress.done()
  app.$emit('router-after')
})

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

window.app = app
