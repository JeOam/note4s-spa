import Vue from 'vue'
import Vuex from 'vuex'

// Make vue aware of vuex
Vue.use(Vuex)
// var localStorage = window.localStorage
// We create an object to hold the initial state when
// the app starts up

let localStorage = window.localStorage
let getToken = function () {
  var token = localStorage.getItem('token')
  if (token) {
    return token
  } else {
    return ''
  }
}

const state = {
  // Set up our initial state
  token: getToken(),
  alertMessage: '',
  alertType: 'warning',
  notebooks: [],
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
  GETNOTEBOOKS (state, notebooks) {
    state.notebooks = notebooks
  },
  UPDATENOTEBOOKINFO (state, notebookId) {
    state.notebookInfo = [
      { sessionName: 'Session3', notes: [{ link: '#1', title: 'Title1' },
                                         { link: '#2', title: 'Title2' }]},
      { sessionName: 'Session4', notes: [{ link: '#3', title: 'Title3' },
                                         { link: '#4', title: 'Title4' }]}
    ]
  },
  SETALERT (state, message, type) {
    state.alertMessage = message
    state.alertType = type
  },
  LOGIN (state, token) {
    localStorage.setItem('token', token)
    state.token = token
  },
  LOGOUT (state) {
    localStorage.removeItem('token')
    state.token = ''
  }
}

// We combine the intial state and the mutations to create a vuex store.
// This store can be linked to our app.
export default new Vuex.Store({
  state,
  mutations
})
