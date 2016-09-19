import api from './index.js'

const getNotebooks = () => {
  return api.baseGet('api/notebook/')
}

const getNoteDetail = (id) => {
  return api.baseGetDetail('api/note/', id)
}

const createNote = (data) => {
  return api.baseCreate('', data)
}

export default {
  getNotebooks,
  getNoteDetail,
  createNote
}
