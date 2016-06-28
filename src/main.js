import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueAwesome from 'vue-awesome'
import NProgress from 'nprogress'
import App from './App'
import configRouter from './routes'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.root = 'http://127.0.0.1:8000'
Vue.http.interceptors.push(() => {
  return {
    request (request) {
      NProgress.start()
      return request
    },
    response (response) {
      NProgress.done()
      return response
    }
  }
})

Vue.component('icon', VueAwesome)

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})

configRouter(router)
router.start(App, '#app')
