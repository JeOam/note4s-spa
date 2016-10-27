import api from './index.js'

const getNotebooks = () => {
  return api.baseGet('api/notebook/')
}

const createNotebook = (params) => {
  return api.baseCreate('api/notebook/', params)
}

const deleteNotebook = (id) => {
  return api.baseDelete('api/notebook/', id)
}

const getNoteDetail = (id) => {
  return api.baseGetDetail('api/note/', id)
}

const createNote = (data) => {
  return api.baseCreate('api/note/', data)
}

export default {
  getNotebooks,
  createNotebook,
  deleteNotebook,
  getNoteDetail,
  createNote
}
