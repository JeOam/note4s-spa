import api from './index.js'

const getNotebooks = () => {
  return api.baseGet('api/notebook/')
}

const getNoteDetail = (id) => {
  return api.baseGetDetail('api/note/', id)
}

export default {
  getNotebooks,
  getNoteDetail
}
