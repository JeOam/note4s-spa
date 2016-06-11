import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueAwesome from 'vue-awesome'
import App from './App'
import configRouter from './routes'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.root = 'http://127.0.0.1:8000'

Vue.component('icon', VueAwesome)

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})

configRouter(router)
router.start(App, '#app')
