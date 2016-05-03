import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import configRouter from './routes'

Vue.use(VueRouter)

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
})

var router = new VueRouter({
  history: true,
  saveScrollPosition: true,
  suppressTransitionError: true
})

configRouter(router)
router.start(App, '#app')
