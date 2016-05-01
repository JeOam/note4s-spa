import Vue from 'vue'
import Vuex from 'vuex'

// Make vue aware of vuex
Vue.use(Vuex)

// We create an object to hold the initial state when
// the app starts up
const state = {
  // Set up our initial state
  notebooks: [
    { id: 1, name: 'Learn JavaScript' },
    { id: 2, name: 'Learn Vue.js' },
    { id: 3, name: 'Build Something Awesome' }
  ],
  selectedNotebookId: 1,
  notebookInfo: [
    { sessionName: 'Session1', notes: [{ link: '#1', title: 'Title1' },
                                       { link: '#2', title: 'Title2' }]},
    { sessionName: 'Session2', notes: [{ link: '#3', title: 'Title3' },
                                       { link: '#4', title: 'Title4' }]}
  ]
}

// Create an object storing various mutations. We will write the mutation
const mutations = {
  // set up our mutations
  GETNOTEBOOKS (state) {
    state.notebooks = [
      { id: 1, name: '1Learn JavaScript' },
      { id: 2, name: '1Learn Vue.js' },
      { id: 3, name: '1Build Something Awesome' }
    ]
  }
}

// We combine the intial state and the mutations to create a vuex store.
// This store can be linked to our app.
export default new Vuex.Store({
  state,
  mutations
})
