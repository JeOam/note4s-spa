// import NProgress from 'nprogress'
const lazyLoading = (path) => {
  return (resolve) => {
    require([`./components/pages/${path}.vue`], resolve)
  }
}

export default [
  {path: '/', name: 'index', component: lazyLoading('index/Index')},
  {path: '/login', name: 'login', component: lazyLoading('login/Login')}
]

// function (router) {
//   router.map({
//     '/': {
//       name: 'index',
//       auth: true,
//       component: require('./components/index/Index.vue')
//     },
//     '/login': {
//       name: 'login',
//       component: require('./components/login/Login.vue')
//     },
//     '/register': {
//       name: 'register',
//       component: require('./components/login/Register.vue')
//     },
//     '/profile': {
//       name: 'profile',
//       auth: true,
//       component: require('./components/profile/Profile.vue')
//     },
//     '/create': {
//       name: 'create',
//       auth: true,
//       component: require('./components/note/Create.vue')
//     },
//     '/detail': {
//       name: 'detail',
//       auth: true,
//       component: require('./components/note/Detail.vue')
//     }
//   })
// }
