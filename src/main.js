import Vue from 'vue'
import VueRouter from 'vue-router'
import VueAwesome from 'vue-awesome'
import App from './App'
import configRouter from './routes'

Vue.use(VueRouter)
Vue.component('icon', VueAwesome)

const router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})

configRouter(router)
router.start(App, '#app')
