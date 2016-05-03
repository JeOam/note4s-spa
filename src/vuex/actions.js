import api from '../api/server'

export const fetchNotebooks = function ({dispatch}, e) {
  dispatch('GETNOTEBOOKS', api.getNotebooks(e))
}

export const updateNotebookInfo = function ({dispatch}, e) {
  dispatch('UPDATENOTEBOOKINFO', e.target.value)
}
