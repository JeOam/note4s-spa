import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // Set up our initial state
  notebooks: [],
  // notebooks: getCacheNotebooks(),
  notebookInfo: []
}

const mutations = {
  // set up our mutations
  GETNOTEBOOKS (state, notebooks) {
    state.notebooks = notebooks
  },
  UPDATENOTEBOOKINFO (state, notebookInfo) {
    state.notebookInfo = notebookInfo
  }
}

export default new Vuex.Store({
  state,
  mutations
})
