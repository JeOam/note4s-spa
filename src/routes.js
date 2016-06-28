import NProgress from 'nprogress'
import store from './vuex/store' // vuex store instance

export default function (router) {
  router.map({
    '/': {
      name: 'index',
      auth: true,
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
      auth: true,
      component: require('./components/note/Detail.vue')
    }
  })
  router.beforeEach(function (transition) {
    NProgress.start()
    if (transition.to.auth && !store.state.token) {
      let redirect = encodeURIComponent(transition.to.path)
      transition.redirect('/login?redirect=' + redirect)
    } else {
      transition.next()
    }
  })
  router.afterEach(() => {
    NProgress.done()
  })
}
