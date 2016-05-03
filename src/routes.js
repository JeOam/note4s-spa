export default function (router) {
  router.map({
    '/': {
      name: 'index',
      component: require('./components/index.vue')
    },
    '/test': {
      name: 'test',
      component: require('./components/NoteGuide.vue')
    }
  })
}
