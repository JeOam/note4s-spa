import api from './index.js'

const getNotebooks = () => {
  return api.baseGet('api/notebook/')
}

const createNotebook = (params) => {
  return api.baseCreate('api/notebook/', params)
}

const deleteNotebook = (id) => {
  return api.baseDelete('api/notebook', id)
}

const getNoteDetail = (id) => {
  return api.baseGetDetail('api/note/', id)
}

const createNote = (data) => {
  return api.baseCreate('api/note/', data)
}

const createSubNote = (data) => {
  return api.baseCreate('api/subnote/', data)
}

const updateNote = (data) => {
  return api.baseUpdate('api/note', data)
}

const deleteNote = (id) => {
  return api.baseDelete('api/note', id)
}

const watchNote = (id) => {
  return api.baseCreate(`api/note/watch/${id}`)
}

const cancelWatchNote = (id) => {
  return api.baseDelete('api/note/watch', id)
}

const starNote = (id) => {
  return api.baseCreate(`api/note/star/${id}`)
}

const cancelStarNote = (id) => {
  return api.baseDelete('api/note/star', id)
}

export default {
  getNotebooks,
  createNotebook,
  deleteNotebook,
  getNoteDetail,
  createNote,
  createSubNote,
  deleteNote,
  updateNote,
  watchNote,
  cancelWatchNote,
  starNote,
  cancelStarNote
}
