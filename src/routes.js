// import NProgress from 'nprogress'
const lazyLoading = (path) => {
  return (resolve) => {
    require([`./components/pages/${path}.vue`], resolve)
  }
}

export default [
  {path: '/', name: 'index', component: lazyLoading('index/Index')},
  {path: '/login', name: 'login', component: lazyLoading('user/Login')},
  {path: '/register', name: 'register', component: lazyLoading('user/Register')},
  {path: '/note/new', name: 'new note', component: lazyLoading('note/Create')},
  {path: '/note/:noteId', name: 'note detail', component: lazyLoading('note/Detail')},
  {path: '/note/edit/:noteId', name: 'edit note', component: lazyLoading('note/Create')},
  {path: '/tool/profiler/json', name: 'json size profiler', component: lazyLoading('profiler/JSONSize')}
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
