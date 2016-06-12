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

let getCacheNotebooks = function () {
  var notebooks = localStorage.getItem('notebooks')
  if (notebooks) {
    // JSON.stringify(j)
    debugger
    return JSON.parse(notebooks)
  } else {
    return []
  }
}
let getCacheNotebookInfo = function (notebook) {
  if (!notebook) {
    return []
  }
  var cacheInfo = localStorage.getItem('notebookInfo')
  if (cacheInfo) {
    // JSON.stringify(j)
    var notebookInfo = JSON.parse(cacheInfo)
    if (notebook[0] && notebookInfo) {
      return notebookInfo.notebook[0]
    }
  }
  return []
}

const state = {
  // Set up our initial state
  token: getToken(),
  alertMessage: '',
  alertType: 'warning',
  notebooks: [],
  // notebooks: getCacheNotebooks(),
  notebookInfo: getCacheNotebookInfo(getCacheNotebooks())
}

// Create an object storing various mutations. We will write the mutation
const mutations = {
  // set up our mutations
  GETNOTEBOOKS (state, notebooks) {
    state.notebooks = notebooks
  },
  UPDATENOTEBOOKINFO (state, notebookInfo) {
    state.notebookInfo = notebookInfo
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

window.store = state  // For debug
