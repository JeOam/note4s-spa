import 'babel-polyfill'
import 'src/vendors/jquery.caret'

import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import NProgress from 'nprogress'
import App from './App'
import routes from './routes'
import store from './vuex/store'

import VueMarkdown from 'layout/VueMarkdown'
import clickoutside from './directives/clickoutside'
import { timeago } from './filters'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.directive('clickoutside', clickoutside)
Vue.component('vue-markdown', VueMarkdown)
Vue.filter('timeago', timeago)

Vue.http.options.root = 'http://localhost:8888'

const pendingRequest = {}
Vue.http.interceptors.push((request, next) => {
  NProgress.inc(0.2)
  pendingRequest[request.url] = 1
  let token = window.localStorage.getItem('token')
  if (token && !request.url.startsWith('api/rest-auth')) {
    request.headers.set('Authorization', `${token}`)
  }
  next((response) => {
    if (response.headers.map['Content-Type'] && response.headers.map['Content-Type'][0] === 'application/pdf; charset="utf-8"') {
      console.log(response.headers)
    } else if (!response.ok && response.status === 0) {
      // 网络错误
      App.methods.showNotification(
        'Network Errors: Please check your network configuration.',
        'warning',
        3,
        app.$children[0]
      )
      response.status = 200
      response.data = {
        code: 200,
        data: []
      }
    } else if (response.status === 401 || response.data.code === 401) {
      // 未登录或登录过期
      App.methods.showNotification('Please login first.', 'warning', 3, app.$children[0])
      response.status = 200
      response.ok = false
      response.data = {
        code: 200,
        data: []
      }
      window.localStorage.removeItem('token')
      if (router.app.$route.name !== 'login') {
        window.localStorage.setItem('lastRouteParams', JSON.stringify(router.app.$route.params))
        router.push({name: 'login', query: {next: router.app.$route.name}})
      } else {
        router.push({name: 'login', query: {next: router.app.$route.query.next}})
      }
    } else if (response.status === 404 || response.data.code === 404) {
      router.push({name: '404'})
    } else if (response.status >= 300 || response.data.code !== 200) {
      // API 访问出错
      App.methods.showNotification(response.data.message, 'error', 5, app.$children[0])
      response.status = 200
      response.ok = false
      response.data = {
        code: 200,
        data: []
      }
    } else {
      console.log(response.url)
    }
    NProgress.done()
    delete pendingRequest[request.url]
    if (Object.keys(pendingRequest).length === 0) {
      NProgress.done()
    }
  })
})

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
