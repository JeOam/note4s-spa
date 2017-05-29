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
     {path: '/user/edit/:username', name: 'edit profile', component: lazyLoading('profile/Edit')},
     {path: '/note/new', name: 'new note', component: lazyLoading('note/Create')},
     {path: '/note/:noteId', name: 'note detail', component: lazyLoading('note/Detail')},
     {path: '/note/:noteId/revisions', name: 'note revision', component: lazyLoading('revision/Index')},
     {path: '/note/edit/:noteId', name: 'edit note', component: lazyLoading('note/Create')},
     {path: '/note/:noteId/comment', name: 'note comment', component: lazyLoading('comment/List')},
     {path: '/organizations/new', name: 'new organization', component: lazyLoading('organization/New')},
     {path: '/organizations/invite/:name', name: 'organization invite', component: lazyLoading('organization/Invite')},
     {path: '/organization/:name',
      component: lazyLoading('organization/Profile'),
      children: [
        {
          path: '',
          name: 'organization notebook',
          component: lazyLoading('organization/Notebook')
        },
        {
          path: 'people',
          name: 'organization people',
          component: lazyLoading('organization/People')
        },
        {
          path: 'accept',
          name: 'organization accept',
          component: lazyLoading('organization/Accept')
        }
      ]}
   ]
  },
  {path: '/redirect', name: 'redirect', component: lazyLoading('user/Redirect')},
  {path: '/code/404', name: '404', component: lazyLoading('404')}
]
