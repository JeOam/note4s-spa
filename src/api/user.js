import api from './index.js'

const login = (data) => {
  return api.baseCreate('api/rest-auth/login/', data)
}

export default {
  login
}
