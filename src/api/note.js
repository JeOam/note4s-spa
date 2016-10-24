import api from './index.js'

const getNotebooks = () => {
  return api.baseGet('api/notebook/')
}

const createNotebook = (params) => {
  return api.baseCreate('api/notebook/', params)
}

const getNoteDetail = (id) => {
  return api.baseGetDetail('api/note/', id)
}

const createNote = (data) => {
  return api.baseCreate('', data)
}

export default {
  getNotebooks,
  createNotebook,
  getNoteDetail,
  createNote
}
