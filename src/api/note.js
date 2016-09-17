import api from './index.js'

const getNotebooks = () => {
  return api.baseGet('api/notebook/')
}

export default {
  getNotebooks
}
