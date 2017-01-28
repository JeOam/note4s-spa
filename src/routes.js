const lazyLoading = (path) => {
  return (resolve) => {
    require([`./components/pages/${path}.vue`], resolve)
  }
}

export default [
  {path: '/',
   component: lazyLoading('Index'),
   children: [
     {path: '', name: 'index', component: lazyLoading('index/Index')},
     {path: 'activity', name: 'activity', component: lazyLoading('activity/Index')},
     {path: 'login', name: 'login', component: lazyLoading('user/Login')},
     {path: 'register', name: 'register', component: lazyLoading('user/Register')},
     {path: ':notebookId', name: 'notebook', component: lazyLoading('index/Index')},
     {
       path: '/user/:username',
       component: lazyLoading('profile/Index'),
       children: [
         {
           path: '',
           name: 'profile overview',
           component: lazyLoading('profile/Contribution')
         },
         {
           path: 'notebooks',
           name: 'profile notebook',
           component: lazyLoading('profile/Notebook')
         },
         {
           path: 'stars',
           name: 'profile star',
           component: lazyLoading('profile/Star')
         },
         {
           path: 'followers',
           name: 'profile follower',
           component: lazyLoading('profile/Follow')
         },
         {
           path: 'following',
           name: 'profile following',
           component: lazyLoading('profile/Follow')
         }
       ]
     },
     {path: '/note/new', name: 'new note', component: lazyLoading('note/Create')},
     {path: '/note/:noteId', name: 'note detail', component: lazyLoading('note/Detail')},
     {path: '/note/edit/:noteId', name: 'edit note', component: lazyLoading('note/Create')},
     {path: '/note/:noteId/comment', name: 'note comment', component: lazyLoading('comment/List')}
   ]
  },
  {path: '/redirect', name: 'redirect', component: lazyLoading('user/Redirect')}
]
