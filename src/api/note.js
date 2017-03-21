import api from './index.js'

const getNotebooks = (params) => {
  return api.baseGet('api/notebook/', params)
}

const createNotebook = (params) => {
  return api.baseCreate('api/notebook/', params)
}

const notebookDetail = (notebookId) => {
  return api.baseGetDetail('api/notebook/', notebookId)
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

const getNoteComment = (id) => {
  return api.baseGetDetail('api/note/comment/', id)
}

const createComment = (id, data) => {
  return api.baseCreate(`api/note/comment/${id}`, data)
}

const starComment = (id) => {
  return api.baseCreate(`api/note/comment/star/${id}`)
}

const cancelStarComment = (id) => {
  return api.baseDelete('api/note/comment/star', id)
}

const watchNotebook = (id) => {
  return api.baseCreate(`api/notebook/watch/${id}`)
}

const getNotebookPDF = (id) => {
  return api.baseGet(`api/notebook/pdf/${id}`)
}

const cancelWatchNotebook = (id) => {
  return api.baseDelete('api/notebook/watch', id)
}

const getNoteRivisions = (id) => {
  return api.baseGetDetail('api/note/revision/', id)
}

export default {
  getNotebooks,
  createNotebook,
  deleteNotebook,
  notebookDetail,
  getNoteDetail,
  createNote,
  createSubNote,
  deleteNote,
  updateNote,
  watchNote,
  cancelWatchNote,
  starNote,
  cancelStarNote,
  getNoteComment,
  createComment,
  starComment,
  cancelStarComment,
  watchNotebook,
  getNotebookPDF,
  cancelWatchNotebook,
  getNoteRivisions
}
