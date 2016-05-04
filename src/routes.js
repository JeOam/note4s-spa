export default function (router) {
  router.map({
    '/': {
      name: 'index',
      component: require('./components/index/Index.vue')
    },
    '/signin': {
      name: 'signin',
      component: require('./components/login/Signin.vue')
    }
  })
}
