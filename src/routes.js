import store from './vuex/store' // vuex store instance

export default function (router) {
  router.map({
    '/': {
      name: 'index',
      component: require('./components/index/Index.vue')
    },
    '/login': {
      name: 'login',
      component: require('./components/login/Login.vue')
    },
    '/register': {
      name: 'register',
      component: require('./components/login/Register.vue')
    },
    '/profile': {
      name: 'profile',
      auth: true,
      component: require('./components/profile/Profile.vue')
    },
    '/create': {
      name: 'create',
      auth: true,
      component: require('./components/note/Create.vue')
    },
    '/detail': {
      name: 'detail',
      component: require('./components/note/Detail.vue')
    }
  })
  router.beforeEach(function (transition) {
    if (transition.to.auth && !store.state.user.authenticated) {
      let redirect = encodeURIComponent(transition.to.path)
      transition.redirect('/login?redirect=' + redirect)
    } else {
      transition.next()
    }
  })
}
