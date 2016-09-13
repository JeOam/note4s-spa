import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import NProgress from 'nprogress'
import App from './App'
import routes from './routes'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.root = 'http://127.0.0.1:8000'
Vue.http.interceptors.push((request, next) => {
  NProgress.inc(0.2)
  next((response) => {
    NProgress.done()
    return response
  })
})

const beforeEach = function (route, redirect, next) {
  NProgress.inc(0.2)
  next()
}

const afterEach = function (route, redirect, next) {
  NProgress.done()
  next()
}

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: routes,
  beforeEach: beforeEach,
  afterEach: afterEach
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
