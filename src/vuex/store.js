const state = {
  // Set up our initial state
  notebooks: [],
  // notebooks: getCacheNotebooks(),
  notebookInfo: []
}

// Create an object storing various mutations. We will write the mutation
const mutations = {
  // set up our mutations
  GETNOTEBOOKS (state, notebooks) {
    state.notebooks = notebooks
  },
  UPDATENOTEBOOKINFO (state, notebookInfo) {
    state.notebookInfo = notebookInfo
  }
}

export default {
  state,
  mutations
}
