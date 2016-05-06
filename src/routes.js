export default function (router) {
  router.map({
    '/': {
      name: 'index',
      component: require('./components/index/Index.vue')
    },
    '/login': {
      name: 'login',
      component: require('./components/login/Login.vue')
    }
  })
}
