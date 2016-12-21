const lazyLoading = (path) => {
  return (resolve) => {
    require([`./components/pages/${path}.vue`], resolve)
  }
}

export default [
  {path: '/', name: 'index', component: lazyLoading('index/Index')},
  {path: '/login', name: 'login', component: lazyLoading('user/Login')},
  {path: '/register', name: 'register', component: lazyLoading('user/Register')},
  {path: '/user/:username', name: 'user profile', component: lazyLoading('user/Profile')},
  {path: '/note/new', name: 'new note', component: lazyLoading('note/Create')},
  {path: '/note/:noteId', name: 'note detail', component: lazyLoading('note/Detail')},
  {path: '/note/edit/:noteId', name: 'edit note', component: lazyLoading('note/Create')},
  {path: '/note/:noteId/comment', name: 'note comment', component: lazyLoading('comment/List')}
]
